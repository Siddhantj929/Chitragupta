class BaseService {
	constructor(model) {
		this.model = model;
	}

	async create(data) {
		return await new this.model(data).save();
	}

	async fetchOne(id) {
		return await this.model.findById(id);
	}

	async fetchAll(filter) {
		return await this.model.find(filter);
	}

	async update(id, data) {
		return await this.model.findByIdAndUpdate(id, data, { new: true });
	}

	async delete(id, data) {
		return await this.model.findByIdAndRemove(id);
	}
}

module.exports = BaseService;
