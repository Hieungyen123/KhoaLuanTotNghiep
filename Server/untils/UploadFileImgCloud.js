const MyConstants = require('./MyConstants');

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: MyConstants.CLOUDINARY_NAME,
    api_key: MyConstants.CLOUDINARY_KEY,
    api_secret: MyConstants.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpeg', 'jpg', 'png', 'webp'],
    params: {
        folder: 'Products-Image',
        transformation: [{ width: 400, height: 400, }],
    }

});
const storageSubcate = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpeg', 'jpg', 'png', 'webp'],
    params: {
        folder: 'Subcate-Image',
        transformation: [{ width: 400, height: 400, }],
    }
});
const storageBrand = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpeg', 'jpg', 'png', 'webp'],
    params: {
        folder: 'Brand-Image',
        transformation: [{ width: 400, height: 400, }],
    }
});
const storageUser = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpeg', 'jpg', 'png', 'webp'],
    params: {
        folder: 'User-Image',
        transformation: [{ width: 400, height: 400, }],
    }

});
const storageProducts = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpeg', 'jpg', 'png', 'webp'],
    params: {
        folder: 'Products-Image',
        transformation: [{ width: 400, height: 400, }],
    }
});
const storageBlog = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpeg', 'jpg', 'png', 'webp'],
    params: {
        folder: 'Blogs-Image',
        transformation: [{ width: 400, height: 400, }],
    }
});

const uploadCloud = multer({ storage: storage });
const uploadCloudSubcate = multer({ storage: storageSubcate });
const uploadCloudBrand = multer({ storage: storageBrand });
const uploadCloudUser = multer({ storage: storageUser });
const uploadCloudProduct = multer({ storage: storageProducts });
const uploadCloudBlog = multer({ storage: storageBlog });

module.exports = { uploadCloud, uploadCloudSubcate, uploadCloudBrand, uploadCloudUser, uploadCloudProduct, uploadCloudBlog };
