class BaseModel {
	constructor(instance) {
		this.instance = instance;
	}

	findAll = async options =>
		await this.instance.find(options).map(i => this.serialized(i));

	findById = async id => this.serialized(await this.instance.findById(id));

	insert = async data => {
		const object = await new this.instance(data).save();
		return this.serialized(object);
	};

	update = async (id, newData) => {
		const updatedUser = await this.instance.findByIdAndUpdate(id, newData);
		return this.serialized(updatedUser);
	};

	serialized = () => {
		throw new Error("serialized() method must be implemented!");
	};
}

module.exports = BaseModel;
