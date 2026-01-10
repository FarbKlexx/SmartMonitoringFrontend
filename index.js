/*
 * Script for login page
 */
var swac_login_options = {
    mode: 'form',
    loginURL: '/SmartUser/smartuser/user/performLogin',
    afterLoginLoc: 'sites/object/dashboard.html',
    afterLogoutLoc: './index.html',
    loggedinRedirects: new Map(),
    activeOn: {
        fromName: 'tbl_systemconfiguration', // Name of the datatable
        fromWheres: {
            filter: 'ckey,eq,func_userlogin&filter=active,eq,true'
        }
    }
};
swac_login_options.loggedinRedirects.set('','sites/object/dashboard.html');
swac_login_options.loggedinRedirects.set('index.html','sites/object/dashboard.html');

var screenboard_options = {
    for: ['[name="swac_user_username"]', '[name="swac_user_password"]'],
    activeOn: {
        fromName: 'tbl_systemconfiguration', // Name of the datatable
        fromWheres: {
            filter: 'ckey,eq,func_userlogin&filter=active,eq,true'
        }
    }
};

// Wait for swac reaction system to be ready
document.addEventListener('swac_ready', function () {
    // Register reaction to the compoenents "selectobject" and "chart"
    window.swac.reactions.addReaction(function (requestors) {
        let user = requestors['loginform'];
        let screenboard = requestors['screenboard'];
        screenboard.swac_comp.options.specialButtons[0] = {
            key: 'icon: sign-in',
            func: user.swac_comp.performLogin
        };
    }, "loginform", "screenboard");
    
    // Check if base tables are installed
    // Get the model
        let Model = window.swac.Model;
        let ooProm = Model.load({
            fromName: 'tbl_observedobject'
        });
        ooProm.then(function (data) {
        }).catch(function(err) {
            //window.location = 'sites/admin/setup.html';
        });
});

document.addEventListener('swac_loginform_inactive', function () {
    // Redirect to dashboard
    window.location.href = 'sites/object/dashboard.html';
});

document.addEventListener('swac_msg', function(evt) {
    if(evt.detail.level === 'error' && evt.detail.msg.includes('No datasource found for')) {
        let tableName = evt.detail.msg.replace('SWAC(model): No datasource found for >','').replace('<','');
        if(tableName === 'tbl_systemconfiguration') {
            UIkit.modal.alert(window.swac.lang.dict.core.loaderror).then(function() {
                window.location = window.location += '?clearstates=true';
            });
        }
    }
});