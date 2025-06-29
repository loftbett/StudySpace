-- コスト分類　データ投入用
INSERT INTO cost_classfication( cost_classfication_cd , cost_classfication_name)  VALUES ( '01' , '直接');
INSERT INTO cost_classfication( cost_classfication_cd , cost_classfication_name)  VALUES ( '02' , '間接');
INSERT INTO cost_classfication( cost_classfication_cd , cost_classfication_name)  VALUES ( '03' , '間接(勉強)');

-- タスク分類　データ投入用
INSERT INTO task_class(task_class_no, task_class_name) VALUES(1,'G内間接');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(2,'入社研修');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(3,'研修');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(4,'勉強会');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(5,'TA勉強会');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(6,'SF開発(初級)');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(7,'TechBlog');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(8,'チームLT');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(100,'関電準備');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(101,'関電');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(102,'関電検針');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(103,'検針(運用)');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(200,'シスメ(BPM再)');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(901,'資格勉強');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(902,'Trailhead');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(903,'勉強');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(904,'開発');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(905,'PartnerLearningCamp');
INSERT INTO task_class(task_class_no, task_class_name) VALUES(999,'その他');

-- タスク種別　データ投入用
INSERT INTO task_type(task_type_no, task_type_name) VALUES(1,'業務(関電一般)');
INSERT INTO task_type(task_type_no, task_type_name) VALUES(2,'業務(関電検針)');
INSERT INTO task_type(task_type_no, task_type_name) VALUES(3,'業務(シスメックス)');
INSERT INTO task_type(task_type_no, task_type_name) VALUES(60,'間接');
INSERT INTO task_type(task_type_no, task_type_name) VALUES(61,'社内勉強');
INSERT INTO task_type(task_type_no, task_type_name) VALUES(62,'個人勉強');

