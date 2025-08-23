const userdetail = require('../../models/userdetails');
const viewuser = async (req, res) => {
  try {
    const findUserdata = await userdetail.find();
    if (findUserdata.length === 0) {
      return res.status(404).json({ message: 'NO user yet' });
    }

    return res.status(200).json({ data: findUserdata });
  } catch (error) {
    return res.status(500).json({ message: 'Error to ge fetch the error from database' });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const finddata = await userdetail.findById(id);
  if (!finddata) {
    return res.status(404).json({ message: 'cannot find this id  for delete' });
  }
  const deletedata = await userdetail.findByIdAndDelete(id, req.body, { new: true });

  res.status(200).json({ message: 'user is deleted from database', data: deletedata });
};
module.exports = { viewuser, deleteUser };
