'use client'
class AuthService {
    _url: string;

    constructor(baseUrl: string) {
        this._url = baseUrl
    }

    _userId(userId: any) {
        if (typeof window === 'undefined') {
            return
        }
        if (typeof userId !== 'undefined') {
            sessionStorage.setItem('uid', userId);
            return
        }
        return sessionStorage.getItem('uid')
    }

    _isLogin() {
        return !!this._userId(undefined)
    }

    login(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(new Date().getTime()) // mock login with api
            }, 300)
        }).then(uid => {
            this._userId(uid)
            return uid
        })
    }

    logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(new Date().getTime()) // mock login with api
            }, 300)
        }).then(() => {
            this._userId(null)
            sessionStorage.removeItem('uid')
            return true
        })
    }

    retriveUser() {
        let user = {
            id: new Date().getTime(),
            name: 'test',
            email: 'test@test.com',
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(user) // mock login with api
            }, 500)
        })
    }

}

export default new AuthService("")