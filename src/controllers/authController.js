const { User, Link } = require('../models');

const getUsersWithLinks = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Link,
          attributes: ['id', 'original_url', 'short_code', 'click_count'],
        },
      ],
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUsersWithLinks,
};
