class BaseService {
	constructor(model) {
		this.model = model;
	}

	async create(data) {
		return await this.model.insert(data);
	}

	async read(id) {
		return await this.model.findById(id);
	}

	async readAll() {
		return await this.model.findAll();
	}

	async update(id, data) {
		return await this.model.update(id, data);
	}

	async delete(id) {
		return await this.model.remove(id);
	}
}

module.exports = BaseService;
