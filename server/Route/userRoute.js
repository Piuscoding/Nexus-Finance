const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');



router.get('/dashboard',userController.dashboardPage);

router.post('/transfer/:id',userController.wirePage_post);
// router.post('/inttransfer/:id',userController.intPage_post);
router.get('/t_history/:id',userController.TPage_post);

router.post('/virtual/:id',userController.vcard_post);

router.post('/edit/:id',userController.editProfilePage_post);
router.post('/editAvatar/:id',userController.editAvatarPage);
router.get('/change_password',userController.changePage);


router.post('/apply_loan/:id',userController.upgradePage_post);
router.get('/myloans/:id',userController.UpgradeHistory);




module.exports = router;

