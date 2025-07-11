function slugify(str) {
  return str
    .normalize("NFD") // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/đ/g, "d") // đ -> d
    .replace(/Đ/g, "d") // Đ -> d
    .replace(/\s+/g, "-") // khoảng trắng -> -
    .replace(/[^a-zA-Z0-9\-]/g, "") // xóa ký tự đặc biệt
    .replace(/-+/g, "-") // loại bỏ nhiều dấu - liên tiếp
    .replace(/^-+|-+$/g, "") // xóa - ở đầu/cuối
    .toLowerCase(); // chữ thường
}

module.exports = {
  slugify,
};
