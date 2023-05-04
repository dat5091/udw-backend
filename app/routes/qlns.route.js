const express = require("express");
const nhanvien = require("../controllers/nhanVien.controller.js");
const chucvu = require("../controllers/chucVu.controller.js");

const router = express.Router();

router.route("/chuc-vu")
    .get(chucvu.findAll)
    .post(chucvu.create)
    .delete(chucvu.deleteAll);

router.route("/chuc-vu/:id")
    .get(chucvu.findOne)
    .put(chucvu.update)
    .delete(chucvu.delete);

router.route("/nhan-vien")
    .get(nhanvien.findAll)
    .post(nhanvien.create)
    .delete(nhanvien.deleteAll);

router.route("/nhan-vien/:id")
    .get(nhanvien.findOne)
    .put(nhanvien.update)
    .delete(nhanvien.delete);

module.exports = router;
