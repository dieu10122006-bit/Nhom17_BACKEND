const response = require("../utils/response");

exports.getAllSubjects = async (_req, res) => {

    const subjects = [
        { id: 1, name: "Bùi Xuân Diệu" },
        { id: 2, name: "Nguyễn Anh Tuấn Nguyễn" }
    ];

    response.success(res, subjects);

};

exports.getSubjectById = async (req, res) => {

    const id = req.params.id;

    const subject = {
        id: id,
        name: "Bùi Xuân Diệu"
    };

    response.success(res, subject);

};

exports.createSubject = async (req, res) => {

    const data = req.body;

    response.created(res, data, "Tạo gia sư thành công");

};

exports.updateSubject = async (req, res) => {

    const id = req.params.id;
    const data = req.body;

    response.success(res, { id, ...data }, "Cập nhập gia sư thành công");

};

exports.deleteSubject = async (req, res) => {

    const id = req.params.id;

    response.success(res, { id }, "Xóa gia sư thành công");

};