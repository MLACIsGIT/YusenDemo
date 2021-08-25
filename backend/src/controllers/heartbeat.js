export const heartbeat = (req, res) => {
  res.json({
    heartbeat: true,
  });
};
