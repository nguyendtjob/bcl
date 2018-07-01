module.exports = {

  create: function (req, res) {

    var title = req.body.title;
    var journal = req.body.journal;
    var year = req.body.year;
    if (isNaN(req.body.year) || req.body.year === "") {
      year = 0;
    } else {
      year = req.body.year;
    }

    var pdf = req.body.pdf;
    var stage = req.body.stage;
    var molecular_classification = req.body.molecular_classification;
    var subpopulation = req.body.subpopulation;
    var exp_type = req.body.exp_type;
    var molecule_name = req.body.molecule_name;
    var setting = req.body.setting;
    var study_phase = req.body.study_phase;
    var comp_type = req.body.comp_type;
    var molecule_name_2 = req.body.molecule_name_2;
    var settting_2 = req.body.settting_2;
    var mPFS_exp = req.body.mPFS_exp;
    if (isNaN(req.body.mPFS_exp) || req.body.mPFS_exp === "") {
      mPFS_exp = 0;
    } else {
      mPFS_exp = req.body.mPFS_exp;
    }


    var mPFS_comp = req.body.mPFS_comp;

    if (isNaN(req.body.mPFS_comp) || req.body.mPFS_comp === "") {
      mPFS_comp = 0;
    } else {
      mPFS_comp = req.body.mPFS_comp;
    }

    var mPFS_HR = req.body.mPFS_HR;

    if (isNaN(req.body.mPFS_HR) || req.body.mPFS_HR === "") {
      mPFS_HR = 0;
    } else {
      mPFS_HR = req.body.mPFS_HR;
    }

    var mPFS_significance = req.body.mPFS_significance;
    var mOS_exp = req.body.mOS_exp;
    if (isNaN(req.body.mOS_exp) || req.body.mOS_exp === "") {
      mOS_exp = 0;
    } else {
      mPFS_exp = req.body.mOS_exp;
    }


    var mOS_comp = req.body.mOS_comp;

    if (isNaN(req.body.mOS_comp) || req.body.mOS_comp === "") {
      mOS_comp = 0;
    } else {
      mOS_comp = req.body.mOS_comp;
    }

    var mOS_HR = req.body.mOS_HR;

    if (isNaN(req.body.mOS_HR) || req.body.mOS_HR === "") {
      mOS_HR = 0;
    } else {
      mOS_HR = req.body.mOS_HR;
    }

    var mOS_significance = req.body.mOS_significance;
    var G3_4_AE_exp = req.body.G3_4_AE_exp;

    if (isNaN(req.body.G3_4_AE_exp) || req.body.G3_4_AE_exp === "") {
      G3_4_AE_exp = 0;
    } else {
      G3_4_AE_exp = req.body.G3_4_AE_exp;
    }

    var G3_4_AE_comp = req.body.G3_4_AE_comp;

    if (isNaN(req.body.G3_4_AE_comp) || req.body.G3_4_AE_comp === "") {
      G3_4_AE_comp = 0;
    } else {
      G3_4_AE_comp = req.body.G3_4_AE_comp;
    }

    var conclusion = req.body.conclusion;
    var comment = req.body.comment;


    req.file('file').upload(function whenDone(err,uploadedFiles){
      if (err) {
        sails.log.error(new Error("Create: Error when uploading image file"));
      }

      //In case there is no upload
      if (uploadedFiles.length === 0) {
        Article.create({

          title: title,
          journal: journal,
          year: year,
          pdf: pdf,
          stage: stage,
          molecular_classification: molecular_classification,
          subpopulation: subpopulation,
          exp_type: exp_type,
          molecule_name: molecule_name,
          setting: setting,
          study_phase: study_phase,
          comp_type: comp_type,
          molecule_name_2: molecule_name_2,
          settting_2: settting_2,
          mPFS_exp: mPFS_exp,
          mPFS_comp: mPFS_comp,
          mPFS_HR: mPFS_HR,
          mPFS_significance: mPFS_significance,
          mOS_exp: mOS_exp,
          mOS_comp: mOS_comp,
          mOS_HR: mOS_HR,
          mOS_significance: mOS_significance,
          G3_4_AE_exp: G3_4_AE_exp,
          G3_4_AE_comp: G3_4_AE_comp,
          conclusion: conclusion,
          comment: comment,

        }).exec(function (err) {
          if (err) {
            sails.log.error(new Error("500: Database Error (create)"));
            res.send(500, {error: 'Database Error'});
          }
          res.redirect('Article/adminlist');
        });
      }else {
        //Convert the uploaded file into base64 string, then delete the uploaded file from the disk
        var fs = require('fs');
        var bitmap = fs.readFileSync(uploadedFiles[0].fd);
        pdf = "data:application/pdf;base64,"+ bitmap.toString('base64');
        fs.unlink(uploadedFiles[0].fd, function(err) {
          if (err) {
            sails.log.error(new Error("Create: Error when deleting file in the server"));
            return;
          }

          Article.create({

            title: title,
            journal: journal,
            year: year,
            pdf: pdf,
            stage: stage,
            molecular_classification: molecular_classification,
            subpopulation: subpopulation,
            exp_type: exp_type,
            molecule_name: molecule_name,
            setting: setting,
            study_phase: study_phase,
            comp_type: comp_type,
            molecule_name_2: molecule_name_2,
            settting_2: settting_2,
            mPFS_exp: mPFS_exp,
            mPFS_comp: mPFS_comp,
            mPFS_HR: mPFS_HR,
            mPFS_significance: mPFS_significance,
            mOS_exp: mOS_exp,
            mOS_comp: mOS_comp,
            mOS_HR: mOS_HR,
            mOS_significance: mOS_significance,
            G3_4_AE_exp: G3_4_AE_exp,
            G3_4_AE_comp: G3_4_AE_comp,
            conclusion: conclusion,
            comment: comment,

          }).exec(function (err) {
            if (err) {
              sails.log.error(new Error("500: Database Error (create)"));
              res.send(500, {error: 'Database Error'});
            }
            res.redirect('Article/adminlist');
          });
        });
      }

    });
  },


  list: function (req, res) {
    Article.find().exec(function (err, items){
      if (err) {
        sails.log.error(new Error("500: Database Error (search)"));
        res.send(500, {error: 'Database Error'});
      }
      res.view('list', {
        items: items,
      });
    });
  },


  adminlist: function (req, res) {
    Article.find().exec(function (err, items) {
      if (err) {
        sails.log.error(new Error("500: Database Error (adminlist)"));
        res.send(500, {error: 'Database Error'});
      }
      res.view('adminlist', {
        items: items,
      });
    });
  },

  add: function(req, res) {
    res.view('add');
  },

  details: function (req, res) {
    Article.findOne({id: req.params.id}).exec(function (err, item) {
      if (err) {
        sails.log.error(new Error("500: Database Error (details)"));
        res.send(500, {error: 'Database Error'});
      }

      if(!item){
        res.redirect('404');
      }else{
        res.view('details', {item: item});
      }
    })
  },


  edit: function (req, res) {
    Article.findOne({id: req.params.id}).exec(function (err, item) {
      if (err) {
        sails.log.error(new Error("500: Database Error (edit)"));
        res.send(500, {error: 'Database Error'});
      }
      res.view('edit', {item: item});
    })
  },


  update: function(req, res){

    var title = req.body.title;
    var journal = req.body.journal;
    var year = req.body.year;
    var year = req.body.year;
    if (isNaN(req.body.year) || req.body.year === "") {
      year = 0;
    } else {
      year = req.body.year;
    }
    var pdf = req.body.pdf;
    var stage = req.body.stage;
    var molecular_classification = req.body.molecular_classification;
    var subpopulation = req.body.subpopulation;
    var exp_type = req.body.exp_type;
    var molecule_name = req.body.molecule_name;
    var setting = req.body.setting;
    var study_phase = req.body.study_phase;
    var comp_type = req.body.comp_type;
    var molecule_name_2 = req.body.molecule_name_2;
    var settting_2 = req.body.settting_2;
    var mPFS_exp = req.body.mPFS_exp;
    if (isNaN(req.body.mPFS_exp) || req.body.mPFS_exp === "") {
      mPFS_exp = 0;
    } else {
      mPFS_exp = req.body.mPFS_exp;
    }


    var mPFS_comp = req.body.mPFS_comp;

    if (isNaN(mPFS_comp) || mPFS_comp === "") {
      mPFS_comp = 0;
    } else {
      mPFS_comp = req.body.mPFS_comp;
    }

    var mPFS_HR = req.body.mPFS_HR;

    if (isNaN(req.body.mPFS_HR) || req.body.mPFS_HR === "") {
      mPFS_HR = 0;
    } else {
      mPFS_HR = req.body.mPFS_HR;
    }

    var mPFS_significance = req.body.mPFS_significance;
    var mOS_exp = req.body.mOS_exp;
    if (isNaN(req.body.mOS_exp) || req.body.mOS_exp === "") {
      mOS_exp = 0;
    } else {
      mPFS_exp = req.body.mOS_exp;
    }


    var mOS_comp = req.body.mOS_comp;

    if (isNaN(req.body.mOS_comp) || req.body.mOS_comp === "") {
      mOS_comp = 0;
    } else {
      mOS_comp = req.body.mOS_comp;
    }

    var mOS_HR = req.body.mOS_HR;

    if (isNaN(req.body.mOS_HR) || req.body.mOS_HR === "") {
      mOS_HR = 0;
    } else {
      mOS_HR = req.body.mOS_HR;
    }

    var mOS_significance = req.body.mOS_significance;
    var G3_4_AE_exp = req.body.G3_4_AE_exp;

    if (isNaN(req.body.G3_4_AE_exp) || req.body.G3_4_AE_exp === "") {
      G3_4_AE_exp = 0;
    } else {
      G3_4_AE_exp = req.body.G3_4_AE_exp;
    }

    var G3_4_AE_comp = req.body.G3_4_AE_comp;

    if (isNaN(req.body.G3_4_AE_comp) || req.body.G3_4_AE_comp === "") {
      G3_4_AE_comp = 0;
    } else {
      G3_4_AE_comp = req.body.G3_4_AE_comp;
    }

    var conclusion = req.body.conclusion;
    var comment = req.body.comment;


    req.file('file').upload(function whenDone(err,uploadedFiles){
      if (err) {
        sails.log.error(new Error("Create: Error when uploading file"));
      }

      //In case there is no upload
      if (uploadedFiles.length === 0) {
        Article.update({id: req.params.id},{

          title: title,
          journal: journal,
          year: year,
          pdf: pdf,
          stage: stage,
          molecular_classification: molecular_classification,
          subpopulation: subpopulation,
          exp_type: exp_type,
          molecule_name: molecule_name,
          setting: setting,
          study_phase: study_phase,
          comp_type: comp_type,
          molecule_name_2: molecule_name_2,
          settting_2: settting_2,
          mPFS_exp: mPFS_exp,
          mPFS_comp: mPFS_comp,
          mPFS_HR: mPFS_HR,
          mPFS_significance: mPFS_significance,
          mOS_exp: mOS_exp,
          mOS_comp: mOS_comp,
          mOS_HR: mOS_HR,
          mOS_significance: mOS_significance,
          G3_4_AE_exp: G3_4_AE_exp,
          G3_4_AE_comp: G3_4_AE_comp,
          conclusion: conclusion,
          comment: comment,

        }).exec(function (err) {
          if (err) {
            sails.log.error(new Error("500: Database Error (update)"));
            res.send(500, {error: 'Database Error'});
          }
          res.redirect('Article/adminlist');
        });
      }else {
        //Convert the uploaded file into base64 string, then delete the uploaded file from the disk
        var fs = require('fs');
        var bitmap = fs.readFileSync(uploadedFiles[0].fd);
        pdf = "data:application/pdf;base64,"+ bitmap.toString('base64');
        fs.unlink(uploadedFiles[0].fd, function(err) {
          if (err) {
            sails.log.error(new Error("Update: Error when deleting file in the server"));
            return;
          }

          Article.update({id: req.params.id}, {

            title: title,
            journal: journal,
            year: year,
            pdf: pdf,
            stage: stage,
            molecular_classification: molecular_classification,
            subpopulation: subpopulation,
            exp_type: exp_type,
            molecule_name: molecule_name,
            setting: setting,
            study_phase: study_phase,
            comp_type: comp_type,
            molecule_name_2: molecule_name_2,
            settting_2: settting_2,
            mPFS_exp: mPFS_exp,
            mPFS_comp: mPFS_comp,
            mPFS_HR: mPFS_HR,
            mPFS_significance: mPFS_significance,
            mOS_exp: mOS_exp,
            mOS_comp: mOS_comp,
            mOS_HR: mOS_HR,
            mOS_significance: mOS_significance,
            G3_4_AE_exp: G3_4_AE_exp,
            G3_4_AE_comp: G3_4_AE_comp,
            conclusion: conclusion,
            comment: comment,

          }).exec(function (err) {
            if (err) {
              sails.log.error(new Error("500: Database Error (update)"));
              res.send(500, {error: 'Database Error'});
            }
            res.redirect('Article/adminlist');
          });
        });
      }

    });
  },


  delete: function (req, res) {
    Article.destroy({id: req.params.id}).exec(function (err) {
      if (err) {
        sails.log.error(new Error("500: Database Error (delete)"));
        res.send(500, {error: 'Database Error'});
      }
      res.redirect('Article/adminlist');
    });
  }
};
