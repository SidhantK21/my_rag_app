"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __importDefault(require("./routes/route"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const milvusServices_1 = require("./services/milvusServices");
const dotenv_1 = __importDefault(require("dotenv"));
const userAuth_1 = __importDefault(require("./routes/userAuth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, milvusServices_1.initailzeService)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
app.use(express_1.default.json());
app.use("/services", route_1.default);
app.use("/auth", userAuth_1.default);
app.get("/", (res) => {
    res.send("Working");
});
app.listen(port, () => {
    console.log(`Server running on http://localhost${port}`);
});
