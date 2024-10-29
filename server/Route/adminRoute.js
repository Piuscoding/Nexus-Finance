
const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');

//************************************* */  Admin Dashboard  routes**********************//

router.get('/adminRoute',adminController.adminPage );

router.get('/viewUser/:id',adminController.viewUser );

router.get('/editUser/:id',adminController.editUser );

router.put('/editUser/:id', adminController.editUser_post);

// //************************************* */ All Account Upgrades routes**********************//
router.get("/allLoans", adminController.allupgradesPage)
router.get("/viewUpgrade/:id", adminController.viewUprgadesPage)
router.get("/editUpgrade/:id", adminController.editUpgradesPage);
router.put('/editUpgrade/:id',adminController.editUpgrade_post );


router.get("/allTransfer", adminController.allTransfer)
router.get("/viewTransfer/:id", adminController.viewTransfer)
router.get("/editTransfer/:id", adminController.editTransferPage)
router.put("/editTransfer/:id", adminController.editTransfer_post)



// //************************************* */ All Delete routes**********************//
router.delete('/deleteUser/:id', adminController.deletePage);

router.delete("/deleteUpgrade/:id", adminController.deleteUpgrade)

router.delete("/deleteTransfer/:id", adminController.deleteTransfer)


module.exports = router;
