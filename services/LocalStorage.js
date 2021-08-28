export default {
    save(name, value) {
        let item = this.findAll(name);
        if(!Array.isArray(item)) {
            item = [];
        }
        item.push(value);
        localStorage.setItem(name, JSON.stringify(item));
    },
    findAll(name) {
        return JSON.parse(localStorage.getItem(name));
    }
}
