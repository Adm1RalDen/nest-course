class StorageService {
  static instance;

  setCredentials(payload) {
    localStorage.setItem('TOKEN', payload);
  }

  getCredentials() {
    return localStorage.getItem('TOKEN');
  }

  removeCredentials() {
    localStorage.removeItem('TOKEN');
  }

  item(item) {
    const set = (payload) => {
      localStorage.setItem(item, payload);
    };
    const get = () => {
      return localStorage.getItem(item);
    };
    const remove = () => {
      localStorage.removeItem(item);
    };
    return { set, get, remove };
  }

  static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new StorageService();
    return this.instance;
  }
}

export default StorageService;
