const paths = {
    adminDashboardPath(idAdmin: string) {
        return `/admin/${idAdmin}/dashboard`;
    },
    adminDashboardArticlesPath(idAdmin: string) {
        return `/admin/${idAdmin}/dashboard/articles`;
    },
    adminDashboardCommandesPath(idAdmin: string) {
        return `/admin/${idAdmin}/dashboard/commandes`;
    },
    adminDashboardNewArticlePath(idAdmin: string) {
        return `/admin/${idAdmin}/dashboard/articles/new`;
    },
    homePath() {
        return '/';
    },
    authPath() {
        return '/auth';
    },
    authForgotPasswordPath() {
        return '/auth/forgotpassword';
    },
    panierPath() {
        return '/panier';
    },
    articlesPath() {
        return '/articles';
    },
    contactPath() {
        return '/contact';
    },
    articleDetailPath(idArticle: string) {
        return `/articles/${idArticle}`;
    },
    userProfilePath(idUser: string) {
        return `/utilisateur/${idUser}/profile`;
    }
}

export default paths;