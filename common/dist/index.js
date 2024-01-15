"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialsInput = void 0;
const zod_1 = require("zod");
exports.credentialsInput = zod_1.z.object({
    username: zod_1.z.string().min(7).max(21).email(),
    password: zod_1.z.string().min(2).max(10),
});
