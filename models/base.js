class BaseModel {
	constructor(instance) {
		this.instance = instance;
	}

	async findAll(options) {
		return await this.instance.find(options).map(i => this.serialized(i));
	}

	async findById(id) {
		return this.serialized(await this.instance.findById(id));
	}

	async insert(data) {
		const object = await new this.instance(data).save();
		return this.serialized(object);
	}

	async update(id, newData) {
		const updatedUser = await this.instance.findByIdAndUpdate(id, newData);
		return this.serialized(updatedUser);
	}

	serialized() {
		throw new Error("serialized() method must be implemented!");
	}
}

module.exports = BaseModel;