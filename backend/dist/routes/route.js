"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pdfUpload_1 = __importDefault(require("./pdfUpload"));
const queryRoute_1 = __importDefault(require("./queryRoute"));
const router = express_1.default.Router();
router.use("/datatoprocess", pdfUpload_1.default);
router.use("/askai", queryRoute_1.default);
exports.default = router;
