module.exports = {

  attributes: {

    _id : { type: 'string'},

	title : { type: 'string'},

	journal : { type: 'string'},

	year : { type: 'float'},

	pdf : { type: 'string'},

	stage : { type: 'string'},

	molecular_classification : { type: 'string'},

	subpopulation : { type: 'string'},

	exp_type : { type: 'string'},

	molecule_name : { type: 'string'},

	setting : { type: 'string'},

	study_phase : { type: 'string'},

	comp_type : { type: 'string'},

	molecule_name_2 : { type: 'string'},

	settting_2 : { type: 'string'},

	mPFS_exp : { type: 'string'},

	mPFS_comp : { type: 'string'},

	mPFS_HR : { type: 'float'},

	mPFS_significance : { type: 'string'},

	mOS_exp : { type: 'string'},

	mOS_comp : { type: 'string'},

	mOS_HR : { type: 'float'},

	mOS_significance : { type: 'string'},

	G3_4_AE_exp : { type: 'float'},

	G3_4_AE_comp : { type: 'float'},

	conclusion : { type: 'string'},

	comment : { type: 'string'},

  },

  connection: 'sailsMongoDBServer'
};
