const { Link } = require('../models/link');
const { generateShortCode } = require('../utils/generateShortCode');

const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortCode = await generateShortCode();
  const link = await Link.create({ original_url: originalUrl, short_code: shortCode });
  res.status(201).json({ shortCode, shortUrl: link.short_url });
};

const redirectUrl = async (req, res) => {
  const { shortCode } = req.params;
  const link = await Link.findOne({ where: { short_code: shortCode } });
  if (!link) return res.status(404).json({ error: 'Link không tìm thấy' });
  await link.increment('click_count');
  res.redirect(link.original_url);
};

module.exports = { shortenUrl, redirectUrl };