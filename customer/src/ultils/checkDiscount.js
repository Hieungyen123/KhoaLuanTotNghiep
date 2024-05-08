function hasPromotion(product) {
    const promotion = product.promotion;
    // Nếu không có promotion (promotion là một đối tượng rỗng)
    if (!promotion || Object.keys(promotion).length === 0) {
        return false;
    }
    // Lấy thời gian hiện tại
    const currentTime = new Date();
    // Chuyển đổi startDate và endDate từ chuỗi thành đối tượng Date
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    // Kiểm tra xem thời gian hiện tại có nằm trong khoảng startDate và endDate hay không
    if (currentTime >= startDate && currentTime <= endDate) {
        return true
    } else {
        return false
    }
}

export default hasPromotion