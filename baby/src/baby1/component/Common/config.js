/**
 * Created by marc on 2017/8/5.
 */
const config = {
    api: {
        base: 'http://rap.taobao.org/mockjs/7756/',
        list: 'api/list',
        up:"api/up",
        comments:'api/comments',
        comment:'api/comment',
        signup:'api/user/signup',
        verify:'api/user/verify',
    },
    map: {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        follow: 20,
        timeout: 8000,
        size: 0,
    },

}




module.exports = config