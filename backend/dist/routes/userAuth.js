"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const userAuthrouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const jwtSec = process.env.JWT_SECRET || "";
dotenv_1.default.config();
userAuthrouter.post("/signin", async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("")[1];
        if (token) {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, jwtSec);
                return res.status(400).json({
                    message: "User already signed in"
                });
            }
            catch (e) {
                return res.json({
                    message: "Signin jwt expired"
                });
            }
        }
        const { email, password } = req.body;
        const findUser = await prisma.user.findUnique({
            where: { email }
        });
        if (!findUser) {
            return res.status(404).json({
                message: "User with this email do not exists with us try signup "
            });
        }
        const isPassword = await bcrypt_1.default.compare(password, findUser.password);
        if (!isPassword) {
            return res.status(401).json({
                message: "Password doesn't match"
            });
        }
        const newToken = await jsonwebtoken_1.default.sign({ userId: findUser.id, email: findUser.email }, jwtSec, {
            expiresIn: "24hr"
        });
        return res.json({
            token: newToken
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "Error while signin ! Try again"
        });
    }
});
userAuthrouter.post("/signup", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            console.log("Inputs required");
            // throw new Error("Inputs are required for the singup ");
            return res.status(400).json({
                message: "All input fields are required"
            });
        }
        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (userExists) {
            return res.status(409).json({
                message: "User with this email already exists with you! Try signin"
            });
        }
        // in this 10 is the salt rounds 
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // add the stripe and get back a token for the confirmation
        const subscribedStatus = false;
        const user = await prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword,
                subscribed: subscribedStatus
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, jwtSec, {
            expiresIn: "24hr"
        });
        // this will send the response as the user id and the token that we are generating 
        res.json({
            token
        });
    }
    catch (e) {
        console.log("Error while siginup", e);
        return res.status(500).json({
            message: "Error during signup",
            error: e.message
        });
    }
});
exports.default = userAuthrouter;
