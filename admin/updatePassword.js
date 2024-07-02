// updatePassword.js : Mise à jour des mdp dans bdd php myadmin

const { User } = require('../models/indexModels'); 

const hashExistingPasswords = async () => {
  try {
    const users = await User.findAll();
    for (let user of users) {
      if (!bcrypt.getRounds(user.password)) { // Vérifier si le mot de passe n'est pas déjà haché
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        await user.save();
        console.log(`Password for user ${user.id} has been hashed.`);
      }
    }
    console.log('All passwords have been hashed.');
  } catch (error) {
    console.error('Error hashing passwords:', error);
  }
};

hashExistingPasswords();
