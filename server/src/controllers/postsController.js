import { getAllPosts, addPost, updatePost, deletePost, getPostsByUsername } from "../service/postsService.js";
import { logger } from "../../logger.js";
import multer from 'multer';


export const getAllPostsController = async (req, res) => {
    try {
        const allPosts = await getAllPosts()
        res.status(200).json(allPosts)
    } catch (error) {
        res.status(500).json({ error: 'Server error'})
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../server/images'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage }).single('image');

export const addPostController = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                logger.error('Error uploading image');
                return res.status(400).json({ message: 'Error uploading image' });
            } else if (err) {
                logger.error('Server error uploading image');
                return res.status(500).json({ message: 'Server error uploading image' });
            }

            try {
                const { text } = req.body;
                const imageUrl = req.file ? req.file.filename : null;
                const userId = req.user._id;
        
                const newPost = await addPost(userId, text, imageUrl);
                
                res.status(201).json(newPost);
            } catch (error) {
                logger.error('Error creating post', error.message);
                res.status(500).json({ error: 'Server error' });
            }
        });
    } catch (error) {
        logger.error('Error in addPostController', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updatePostController = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                logger.error('Error uploading image');
                return res.status(400).json({ message: 'Error uploading image' });
            } else if (err) {
                logger.error('Server error uploading image');
                return res.status(500).json({ message: 'Server error uploading image' });
            }

            try {
                const postId = req.params.id;
                const { text } = req.body;
                const imageUrl = req.file ? req.file.filename : null;

                const newData = {
                    content: {
                        text,
                        imageUrl
                    }
                };

                logger.info('Update request received for post ID:', postId, 'New Data:', newData);

                const updatedPost = await updatePost(postId, newData);
                res.status(200).json(updatedPost);
            } catch (error) {
                logger.error('Error updating post', error.message);
                res.status(500).json({ error: 'Server error' });
            }
        });
    } catch (error) {
        logger.error('Error in updatePostController', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


export const deletePostController = async (req, res) => {
    try {
        const postId = req.params.id
        await deletePost(postId)
        res.status(200).json({ message: 'Post deleted'})
    } catch (error) {
        if (error.message === 'You do not have permission to delete this post') {
            res.status(403).json({ error: error.message });
        } else if (error.message === 'Post not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
}

export const getPostsByUserController = async (req, res) => {
    try {
        const username = req.params.username;

        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        const postsByUser = await getPostsByUsername(username);

        if (postsByUser.message) {
            return res.status(404).json({ message: postsByUser.message });
        }

        res.status(200).json(postsByUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};