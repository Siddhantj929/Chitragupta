class BaseModel {
	constructor(instance) {
		this.instance = instance;
	}

	async findAll(options) {
		const instances = await this.instance.find(options);
		return instances.map(async i => await this.serialized(i));
	}

	async findById(id) {
		return await this.serialized(await this.instance.findById(id));
	}

	async insert(data) {
		const object = await new this.instance(data).save();
		return await this.serialized(object);
	}

	async update(id, newData) {
		const updatedUser = await this.instance.findByIdAndUpdate(id, newData);
		return await this.serialized(updatedUser);
	}

	async serialized() {
		throw new Error("serialized() method must be implemented!");
	}
}

module.exports = BaseModel;
