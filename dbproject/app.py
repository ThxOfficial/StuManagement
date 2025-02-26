from flask import Flask, request, json
import pymysql
import random
import oss2
import uuid
from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.request import CommonRequest

app = Flask(__name__)


ossDir = ''
basedir = ''
accessKeyId = '***'
accessKeySecret = '***'
urloss="**"
# 使用代码嵌入的RAM用户的访问密钥配置访问凭证。
auth = oss2.Auth(accessKeyId, accessKeySecret)

endpoint = '***'
bucket = oss2.Bucket(auth, endpoint, '***')

def con():
    return pymysql.connect(host='localhost', user='root', password='***', database='***',
                           charset='utf8', autocommit=True)


@app.route('/captcha', methods=['GET', 'POST'])
def captcha():
    num = random.randint(1, 40)
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT * FROM CAPTCHA WHERE NUM='" + str(num) + "'"
    cursor.execute(sql)
    res = cursor.fetchone()
    return json.dumps(res)


rigid = '114514'


@app.route('/login', methods=['GET', 'POST'])
def login():
    exist = 'no'
    id0 = request.values.get("id")
    pswd0 = request.values.get("password")
    id = 'no'
    pswd = 'no'
    if id0 and pswd0:
        id1 = id0
        pswd1 = pswd0
        print(id0, pswd0)
        conn = con()
        cursor = conn.cursor()
        sql = "SELECT PSWD FROM SUSER WHERE ID = '" + id1 + "'"
        print(sql)
        cursor.execute(sql)
        check = cursor.fetchall()

        if check:
            print(check[0][0])
            print(pswd1)
            if (check[0][0] == pswd1):
                pswd = 'yes'
            exist = 'yes'
            id = 'yes'
    res = (id, exist, pswd)
    print(res[0], res[1], res[2])
    return json.dumps(res)


@app.route('/logint', methods=['GET', 'POST'])
def logint():
    exist = 'no'
    id0 = request.values.get("id")
    pswd0 = request.values.get("password")
    id = 'no'
    pswd = 'no'
    if id0 and pswd0:
        id1 = id0
        pswd1 = pswd0
        print(id0, pswd0)
        conn = con()
        cursor = conn.cursor()
        sql = "SELECT PSWD FROM TUSER WHERE ID = '" + id1 + "'"
        print(sql)
        cursor.execute(sql)
        check = cursor.fetchall()

        if check:
            print(check[0][0])
            if (check[0][0] == pswd1):
                pswd = 'yes'
            exist = 'yes'
            id = 'yes'
        # exist = 'yes'#貌似有问题
    res = (id, exist, pswd)
    print(res[0], res[1], res[2])
    return json.dumps(res)

@app.route("/sid", methods=['GET', 'POST'])
def stu_id():
    exist = 'yes'
    right = 'no'
    id = request.values.get("id")
    print(id)
    num = 0
    els = 0
    for index in range(len(id)):
        if id[index] >= '0' and id[index] <= '9':
            num += 1
        else:
            els += 1
    if len(id) == 12:
        if num > 0 and els == 0:
            right = 'yes'
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT ID FROM SUSER WHERE ID = '" + id + "'"
    print(sql)
    cursor.execute(sql)
    check = cursor.fetchall()
    print(check)
    if len(check) == 0:
        print("正确")
        exist = 'no'
    res = (exist, right)
    global rigid
    rigid = id
    print(rigid)
    return json.dumps(res)


@app.route('/tid', methods=['GET', 'POST'])
def tea_id():
    exist = 'yes'
    right = 'no'
    id = request.values.get("id")
    print(id)
    num = 0
    els = 0
    for index in range(len(id)):
        if id[index] >= '0' and id[index] <= '9':
            num += 1
        else:
            els += 1
    if len(id) == 12:
        if num > 0 and els == 0:
            right = 'yes'
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT ID FROM TUSER WHERE ID = '" + id + "'"
    print(sql)
    cursor.execute(sql)
    check = cursor.fetchall()
    # checkpwd = check[0][0]
    print(check)
    if len(check) == 0:
        print("正确")
        exist = 'no'
    res = (exist, right)
    global rigid
    rigid = id
    return json.dumps(res)


@app.route('/spswd', methods=['GET', 'POST'])
def spswd():
    pswd = request.values.get("pswd")
    num = 0
    chrbig = 0
    sym = 0
    chrsmall = 0
    short = 'short'
    right = 'no'
    if len(pswd) >= 8:    # 密码需要大于8位
        short = 'long'
        for index in range(len(pswd)):
            if pswd[index] >= 'a' and pswd[index] <= 'z':
                chrsmall += 1
            elif pswd[index] >= '0' and pswd[index] <= '9':
                num += 1
            elif pswd[index] >= 'A' and pswd[index] <= 'Z':
                chrbig += 1
            elif pswd[index] == '!' or pswd[index] == '?' or pswd[index] == '@':
                sym += 1
    print(chrsmall, num, chrbig, sym, short)
    if num and chrbig and chrsmall and sym:
        right = 'yes'
        conn = con()
        cursor = conn.cursor()
        sql = "INSERT INTO SUSER VALUES('" + rigid + "','" + pswd + "');"
        print("1" + sql)
        cursor.execute(sql)
        uid = uuid.uuid4()
        uniid = str(uid)
        sql = "INSERT INTO STUINFO(ID,UUID) VALUES('" + rigid + "','" + uniid + "');"
        cursor.execute(sql)
        print("2" + sql)
    res = (short, right)
    return json.dumps(res)


@app.route('/tpswd', methods=['GET', 'POST'])
def tpswd():
    pswd = request.values.get("pswd")
    num = 0
    chrbig = 0
    sym = 0
    chrsmall = 0
    short = 'short'
    right = 'no'
    # 密码需要大于8位
    if len(pswd) >= 8:
        short = 'long'
        for index in range(len(pswd)):
            if pswd[index] >= 'a' and pswd[index] <= 'z':
                chrsmall += 1
            elif pswd[index] >= '0' and pswd[index] <= '9':
                num += 1
            elif pswd[index] >= 'A' and pswd[index] <= 'Z':
                chrbig += 1
            elif pswd[index] == '!' or pswd[index] == '?' or pswd[index] == '@':
                sym += 1
    print(chrsmall, num, chrbig, sym, short)
    if num and chrbig and chrsmall and sym:
        right = 'yes'
        conn = con()
        cursor = conn.cursor()
        sql = "INSERT INTO TUSER VALUES('" + rigid + "','" + pswd + "');"
        print(sql)
        cursor.execute(sql)
        #check = cursor.fetchall()
        uid = uuid.uuid4()
        uniid = str(uid)
        sql = "INSERT INTO ARRINFO(ID,UUID) VALUES('" + rigid + "','" + uniid + "');"
        cursor.execute(sql)
        print(sql)
    res = (short, right)
    return json.dumps(res)


@app.route('/sctr', methods=['GET', 'POST'])
def sctr():
    id = request.values.get("id")
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT * FROM STUINFO WHERE ID = '" + id + "'"
    print(sql)
    cursor.execute(sql)
    res = cursor.fetchall()
    print(res)
    return json.dumps(res)


@app.route('/tctr', methods=['GET', 'POST'])
def tctr():
    id = request.values.get("id")
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT * FROM ARRINFO WHERE ID = '" + id + "'"
    print(sql)
    cursor.execute(sql)
    res = cursor.fetchall()
    print(res)
    return json.dumps(res)


@app.route('/sinfocg', methods=['GET', 'POST'])
def sinfocg():
    id = request.values.get("id")
    nkname = request.values.get("nkname")
    name = request.values.get("name")
    sex = request.values.get("sex")
    sig = request.values.get("sig")
    conn = con()
    cursor = conn.cursor()
    if (nkname):
        sql = "UPDATE STUINFO SET NKNAME='" + nkname + "' WHERE ID = '" + id + "'"
        cursor.execute(sql)
    if (name):
        sql = "UPDATE STUINFO SET NAME='" + name + "' WHERE ID = '" + id + "'"
        cursor.execute(sql)
    if (sex):
        sql = "UPDATE STUINFO SET SEX='" + sex + "' WHERE ID = '" + id + "'"
        cursor.execute(sql)
    if (sig):
        sql = "UPDATE STUINFO SET SIG='" + sig + "' WHERE ID = '" + id + "'"
        cursor.execute(sql)
    return 'yes'


@app.route('/tinfocg', methods=['GET', 'POST'])
def tinfocg():
    id = request.values.get("id")
    name = request.values.get("name")
    sex = request.values.get("sex")
    sig = request.values.get("sig")
    conn = con()
    cursor = conn.cursor()
    if (name):
        sql = "UPDATE ARRINFO SET NAME='" + name + "' WHERE ID = '" + id + "'"
        cursor.execute(sql)
    if (sex):
        sql = "UPDATE ARRINFO SET SEX='" + sex + "' WHERE ID = '" + id + "'"
        cursor.execute(sql)
    if (sig):
        sql = "UPDATE ARRINFO SET SIG='" + sig + "' WHERE ID = '" + id + "'"
        cursor.execute(sql)
    return 'yes'

'''改翻页'''
@app.route('/course', methods=['GET', 'POST'])
def course():
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM COURSE"
    cursor.execute(sql)
    res = cursor.fetchall()
    #print(res)
    return json.dumps(res)


@app.route('/courcg', methods=['GET', 'POST'])
def courcg():
    cid = request.values.get("cid")
    print(cid)
    return '0'


@app.route('/courdel', methods=['GET', 'POST'])
def courdel():
    cid = request.values.get("cid")
    print(cid)
    conn = con()
    cursor = conn.cursor()
    sql = "DELETE FROM TC WHERE CID = '" + cid + "'"
    cursor.execute(sql)
    sql = "DELETE FROM SC WHERE CID = '" + cid + "'"
    cursor.execute(sql)
    sql = "DELETE FROM COURSE WHERE CID = '" + cid + "'"
    cursor.execute(sql)
    return '0'


@app.route('/arrpiccg', methods=['GET', 'POST'])
def arrpiccg():
    uid = uuid.uuid4()
    unid = str(uid)
    pic = request.files.get('pic')
    tid = request.form.get("tid")
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT UUID FROM ARRINFO WHERE ID = '" + tid + "'"
    cursor.execute(sql)
    res = cursor.fetchone()
    uniid = res[0]
    print(uniid)
    if pic is not None:
        path = 'static/teactr/' + unid + '.png'
        picpath = urloss + "/teactr/" + unid + ".png"
        pic.save(path)
        bucket.put_object_from_file('teactr/' + unid + '.png', path)
        sql = "UPDATE ARRINFO SET PIC='" + picpath + "' WHERE ID = '" + tid + "'"
        cursor.execute(sql)
        return "success"
    return "fail"


@app.route('/stupiccg', methods=['GET', 'POST'])
def stupiccg():
    uid = uuid.uuid4()
    unid = str(uid)
    pic = request.files.get('pic')
    sid = request.form.get("sid")
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT UUID FROM STUINFO WHERE ID = '" + sid + "'"
    cursor.execute(sql)
    res = cursor.fetchone()
    uniid = res[0]
    print(uniid)
    if pic is not None:
        path = 'static/stuctr/' + unid + '.png'
        picpath = urloss+"/stuctr/" + unid + ".png"
        pic.save(path)
        bucket.put_object_from_file('stuctr/' + unid + '.png', path)
        conn = con()
        cursor = conn.cursor()
        sql = "UPDATE STUINFO SET PIC='" + picpath + "' WHERE ID = '" + sid + "'"
        cursor.execute(sql)
        return "success"
    return "fail"


@app.route('/coursecg', methods=['GET', 'POST'])
def coursecg():
    id = request.values.get("cid")
    name = request.values.get("name")
    tm = request.values.get("tm")
    score = request.values.get("score")
    print("id" + id)
    conn = con()
    cursor = conn.cursor()
    if (name):
        sql = "UPDATE COURSE SET NAME='" + name + "' WHERE CID = '" + id + "'"
        cursor.execute(sql)
    if (tm):
        sql = "UPDATE COURSE SET TM=" + tm + " WHERE CID = '" + id + "'"
        cursor.execute(sql)
    if (score):
        sql = "UPDATE COURSE SET SCORE=" + score + " WHERE CID = '" + id + "'"
        cursor.execute(sql)
    return 'yes'


@app.route('/coursefd', methods=['GET', 'POST'])
def coursefd():
    id = request.values.get("id")
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT * FROM COURSE WHERE CID = '" + id + "'"
    cursor.execute(sql)
    res = cursor.fetchone()
    return json.dumps(res)


@app.route('/coursepiccg', methods=['GET', 'POST'])
def coursepiccg():
    uid = uuid.uuid4()
    unid = str(uid)
    pic = request.files.get('pic')
    print(pic)
    cid = request.form.get("cid")
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT UUID FROM COURSE WHERE CID = '" + cid + "'"
    cursor.execute(sql)
    res = cursor.fetchone()
    uniid = res[0]
    print(uniid)
    print(cid)
    if pic is not None:
        path = 'static/course/' + unid + '.png'
        picpath = urloss+'/course/' + unid + '.png'
        pic.save(path)
        bucket.put_object_from_file('course/' + unid + '.png', path)
        sql = "UPDATE COURSE SET PIC='" + picpath + "' WHERE CID = '" + cid + "'"
        cursor.execute(sql)
        return "success"
    return "fail"

'''改翻页'''
@app.route('/searchcourse1', methods=['GET', 'POST'])
def searchcourse1():
    name = request.values.get("name")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    if name:
        sql = "SELECT * FROM COURSE WHERE NAME='" + name + "'"
    else:
        sql = "SELECT * FROM COURSE"
    cursor.execute(sql)
    res = cursor.fetchall()
    print(res)
    return json.dumps(res)

'''改翻页'''
@app.route('/searchcourse2', methods=['GET', 'POST'])
def searchcourse2():
    name = request.values.get("name")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    if name:
        sql = "SELECT * FROM COURSE WHERE NAME LIKE '%" + name + "%'"
    else:
        sql = "SELECT * FROM COURSE"
    print(sql)
    cursor.execute(sql)
    res = cursor.fetchall()
    print(res)
    return json.dumps(res)


@app.route('/addcourse', methods=['GET', 'POST'])
def addcourse():
    uid = uuid.uuid4()
    uniid = str(uid)
    cid = request.values.get("cid")
    name = request.values.get("name")
    tm = request.values.get("tm")
    score = request.values.get("score")
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT * FROM COURSE WHERE CID = '" + cid + "'"
    cursor.execute(sql)
    check = cursor.fetchall()
    if len(check) == 0:
        sql = "INSERT INTO COURSE (CID,NAME,TM,SCORE,UUID) VALUES ('" + cid + "','" + name + "','" + tm + "','" + score + "','" + uniid + "')"
        print(sql)
        cursor.execute(sql)
        return 'yes'
    else:
        return 'no'

'''改翻页'''
@app.route('/thome', methods=['GET', 'POST'])
def thome():
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM COURSE"
    cursor.execute(sql)
    res = cursor.fetchall()
    # print(res)
    return json.dumps(res)

'''改翻页'''
@app.route('/thomedetl', methods=['GET', 'POST'])
def thomedetl():
    cid = request.values.get("cid")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM COURSE WHERE CID = '" + cid + "'"
    print(sql)
    cursor.execute(sql)
    cinfo = cursor.fetchall()
    sql = "SELECT * FROM TEACHER WHERE TID IN (SELECT TID FROM TC WHERE CID = '" + cid + "')"
    cursor.execute(sql)
    tinfo = cursor.fetchall()
    sql = "SELECT * FROM STUINFO WHERE ID IN (SELECT SID FROM SC WHERE CID = '" + cid + "')"
    cursor.execute(sql)
    sinfo = cursor.fetchall()
    res = (cinfo, tinfo, sinfo)
    return json.dumps(res)

'''改翻页'''
@app.route('/searchhome1', methods=['GET', 'POST'])
def searchhome1():
    name = request.values.get("name")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    if name:
        sql = "SELECT * FROM COURSE WHERE NAME='" + name + "'"
    else:
        sql = "SELECT * FROM COURSE"
    cursor.execute(sql)
    res = cursor.fetchall()
    print(res)
    return json.dumps(res)

'''改翻页'''
@app.route('/searchhome2', methods=['GET', 'POST'])
def searchhome2():
    name = request.values.get("name")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    if name:
        sql = "SELECT * FROM COURSE WHERE NAME LIKE '%" + name + "%'"
    else:
        sql = "SELECT * FROM COURSE"
    print(sql)
    cursor.execute(sql)
    res = cursor.fetchall()
    print(res)
    return json.dumps(res)

'''改翻页'''
@app.route('/stulook', methods=['GET', 'POST'])
def stulook():
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM STUINFO"
    cursor.execute(sql)
    res = cursor.fetchall()
    # print(res)
    return json.dumps(res)

'''改翻页'''
@app.route('/searchstu1', methods=['GET', 'POST'])
def searchstu1():
    name = request.values.get("name")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    if name:
        sql = "SELECT * FROM STUINFO WHERE NAME='" + name + "'"
    else:
        sql = "SELECT * FROM STUINFO"
    cursor.execute(sql)
    res = cursor.fetchall()
    print(res)
    return json.dumps(res)

'''改翻页'''
@app.route('/searchstu2', methods=['GET', 'POST'])
def searchstu2():
    name = request.values.get("name")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    if name:
        sql = "SELECT * FROM STUINFO WHERE NAME LIKE '%" + name + "%'"
    else:
        sql = "SELECT * FROM STUINFO"
    print(sql)
    cursor.execute(sql)
    res = cursor.fetchall()
    print(res)
    return json.dumps(res)

'''改翻页'''
@app.route('/teacher', methods=['GET', 'POST'])
def teacher():
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM TEACHER"
    cursor.execute(sql)
    res = cursor.fetchall()
    #print(res)
    return json.dumps(res)

'''改翻页'''
@app.route('/teadel', methods=['GET', 'POST'])
def teadel():
    tid = request.values.get("tid")
    conn = con()
    cursor = conn.cursor()
    sql = "DELETE FROM TC WHERE TID = '" + tid + "'"
    cursor.execute(sql)
    sql = "DELETE FROM TEACHER WHERE TID = '" + tid + "'"
    cursor.execute(sql)
    return '0'


@app.route('/teacherinfocg', methods=['GET', 'POST'])
def teacherinfocg():
    id = request.values.get("tid")
    name = request.values.get("name")
    ttl = request.values.get("ttl")
    tel = request.values.get("tel")
    print("id" + id)
    conn = con()
    cursor = conn.cursor()
    if (name):
        sql = "UPDATE TEACHER SET NAME='" + name + "' WHERE TID = '" + id + "'"
        cursor.execute(sql)
    if (ttl):
        sql = "UPDATE TEACHER SET TTL='" + ttl + "' WHERE TID = '" + id + "'"
        cursor.execute(sql)
    if (tel):
        sql = "UPDATE TEACHER SET TEL='" + tel + "' WHERE TID = '" + id + "'"
        cursor.execute(sql)
    return 'yes'


@app.route('/teacherfd', methods=['GET', 'POST'])
def teacherfd():
    id = request.values.get("id")
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT * FROM TEACHER WHERE TID = '" + id + "'"
    cursor.execute(sql)
    res = cursor.fetchone()
    return json.dumps(res)


@app.route('/teacherpiccg', methods=['GET', 'POST'])
def teacherpiccg():
    uid = uuid.uuid4()
    unid = str(uid)
    pic = request.files.get('pic')
    print(pic)
    tid = request.form.get("tid")
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT UUID FROM TEACHER WHERE TID = '" + tid + "'"
    cursor.execute(sql)
    res = cursor.fetchone()
    uniid = res[0]
    print(uniid)
    if pic is not None:
        path = 'static/teacher/' + unid + '.png'
        picpath = urloss+'/teacher/' + unid + '.png'
        pic.save(path)
        bucket.put_object_from_file('teacher/' + unid + '.png', path)
        sql = "UPDATE TEACHER SET PIC='" + picpath + "' WHERE TID = '" + tid + "'"
        cursor.execute(sql)
        return "success"
    return "fail"

'''改翻页'''
@app.route('/searchteacher1', methods=['GET', 'POST'])
def searchteacher1():
    name = request.values.get("name")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    if name:
        sql = "SELECT * FROM TEACHER WHERE NAME='" + name + "'"
    else:
        sql = "SELECT * FROM TEACHER"
    cursor.execute(sql)
    res = cursor.fetchall()
    print(res)
    return json.dumps(res)

'''改翻页'''
@app.route('/searchteacher2', methods=['GET', 'POST'])
def searchteacher2():
    name = request.values.get("name")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    if name:
        sql = "SELECT * FROM TEACHER WHERE NAME LIKE '%" + name + "%'"
    else:
        sql = "SELECT * FROM TEACHER"
    print(sql)
    cursor.execute(sql)
    res = cursor.fetchall()
    print(res)
    return json.dumps(res)


@app.route('/addteacher', methods=['GET', 'POST'])
def addteacher():
    uid = uuid.uuid4()
    uniid = str(uid)
    tid = request.values.get("tid")
    name = request.values.get("name")
    ttl = request.values.get("ttl")
    tel = request.values.get("tel")
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT * FROM TEACHER WHERE TID = '" + tid + "'"
    cursor.execute(sql)
    check = cursor.fetchall()
    if len(check) == 0:
        sql = "INSERT INTO TEACHER (TID,NAME,TTL,TEL,UUID) VALUES ('" + tid + "','" + name + "','" + ttl + "','" + tel + "','" + uniid + "')"
        print(sql)
        cursor.execute(sql)
        return 'yes'
    else:
        return 'no'

'''改翻页'''
@app.route('/cdiffer', methods=['GET', 'POST'])
def cdiffer():
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM COURSE WHERE CID IN (SELECT CID FROM TC)"
    cursor.execute(sql)
    cour1 = cursor.fetchall()
    sql = "SELECT * FROM COURSE WHERE CID NOT IN (SELECT CID FROM TC)"
    cursor.execute(sql)
    cour2 = cursor.fetchall()
    res = (cour2, cour1)
    # print(res)
    return json.dumps(res)


@app.route('/tcdel', methods=['GET', 'POST'])
def tcdel():
    cid = request.values.get("cid")
    conn = con()
    cursor = conn.cursor()
    sql = "DELETE FROM TC WHERE CID = '" + cid + "'"
    cursor.execute(sql)
    return '0'

'''改翻页'''
@app.route('/searchtc2', methods=['GET', 'POST'])
def searchtc2():
    name = request.values.get("name")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    if name:
        sql = "SELECT * FROM COURSE WHERE NAME LIKE '%" + name + "%' AND CID IN (SELECT CID FROM TC)"
    else:
        sql = "SELECT * FROM COURSE WHERE CID IN (SELECT CID FROM TC)"
    print(sql)
    cursor.execute(sql)
    res = cursor.fetchall()
    print(res)
    return json.dumps(res)

'''改翻页'''
@app.route('/searchtc1', methods=['GET', 'POST'])
def searchtc1():
    name = request.values.get("name")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    if name:
        sql = "SELECT * FROM COURSE WHERE NAME LIKE '%" + name + "%' AND CID NOT IN (SELECT CID FROM TC)"
    else:
        sql = "SELECT * FROM COURSE WHERE CID NOT IN (SELECT CID FROM TC)"
    print(sql)
    cursor.execute(sql)
    res = cursor.fetchall()
    print(res)
    return json.dumps(res)


@app.route('/tc', methods=['GET', 'POST'])
def tc():
    tid = request.values.get("tid")
    cid = request.values.get("cid")
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT * FROM TC WHERE TID='" + tid + "' AND CID='" + cid + "'"
    cursor.execute(sql)
    check = cursor.fetchall()
    if len(check) == 0:
        sql = "INSERT INTO TC (TID,CID) VALUES ('" + tid + "','" + cid + "')"
        cursor.execute(sql)
        return 'yes'
    else:
        return 'no'


@app.route('/stuinfo', methods=['GET', 'POST'])
def stuinfo():
    id = request.values.get("id")
    conn = con()
    cursor = conn.cursor()
    sql = "SELECT * FROM STUINFO WHERE ID='" + id + "'"
    cursor.execute(sql)
    res = cursor.fetchone()
    return json.dumps(res)

'''改翻页'''
@app.route('/searchsc', methods=['GET', 'POST'])
def searchsc():
    sid = request.values.get("sid")
    name = request.values.get("name")
    action = request.values.get("action")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    if name:
        if action == "blur":
            sql = "SELECT * FROM COURSE WHERE NAME LIKE '%" + name + "%' AND CID NOT IN (SELECT CID FROM SC WHERE SID='"+sid+"')"
            cursor.execute(sql)
        elif action == "acrt":
            sql = "SELECT * FROM COURSE WHERE NAME='" + name + "' AND CID NOT IN (SELECT CID FROM SC WHERE SID='"+sid+"')"
            cursor.execute(sql)
    else:
        sql = "SELECT * FROM COURSE WHERE CID NOT IN (SELECT CID FROM SC WHERE SID='"+sid+"')"
        cursor.execute(sql)
    res = cursor.fetchall()
    print(res)
    return json.dumps(res)

'''改翻页'''
@app.route('/searchmc', methods=['GET', 'POST'])
def searchmc():
    sid = request.values.get("sid")
    name = request.values.get("name")
    action = request.values.get("action")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    if name:
        if action == "blur":
            sql = "SELECT * FROM COURSE WHERE NAME LIKE '%" + name + "%' AND CID IN (SELECT CID FROM SC WHERE SID='"+sid+"')"
            cursor.execute(sql)
        elif action == "acrt":
            sql = "SELECT * FROM COURSE WHERE NAME='" + name + "' AND CID IN (SELECT CID FROM SC WHERE SID='"+sid+"')"
            cursor.execute(sql)
    else:
        sql = "SELECT * FROM COURSE WHERE CID IN (SELECT CID FROM SC WHERE SID='"+sid+"')"
        cursor.execute(sql)
    res = cursor.fetchall()
    print(res)
    return json.dumps(res)

'''改翻页'''
@app.route('/stuhome', methods=['GET', 'POST'])
def stuhome():
    sid = request.values.get("sid")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM COURSE WHERE CID IN (SELECT CID FROM SC WHERE SID='"+sid+"')"
    cursor.execute(sql)
    res = cursor.fetchall()
    #print(res)
    return json.dumps(res)

'''改翻页'''
@app.route('/selcour', methods=['GET', 'POST'])
def selcour():
    sid = request.values.get("sid")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM COURSE WHERE CID NOT IN (SELECT CID FROM SC WHERE SID='"+sid+"')"
    cursor.execute(sql)
    res = cursor.fetchall()
    #print(res)
    return json.dumps(res)

'''改翻页'''
@app.route('/sc', methods=['GET', 'POST'])
def sc():
    sid = request.values.get("sid")
    cid = request.values.get("cid")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    sql = "INSERT INTO SC (SID,CID) VALUES ('" + sid + "','" + cid + "')"
    cursor.execute(sql)
    sql = "SELECT * FROM COURSE WHERE CID NOT IN (SELECT CID FROM SC WHERE SID='"+sid+"')"
    cursor.execute(sql)
    res = cursor.fetchall()
    # print(res)
    return json.dumps(res)


@app.route('/scdel', methods=['GET', 'POST'])
def scdel():
    sid = request.values.get("sid")
    cid = request.values.get("cid")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    sql = "DELETE FROM SC WHERE SID = '" + sid + "' AND CID = '" + cid + "'"
    cursor.execute(sql)
    sql = "SELECT * FROM COURSE WHERE CID IN (SELECT CID FROM SC WHERE SID='"+sid+"')"
    cursor.execute(sql)
    res = cursor.fetchall()
    # print(res)
    return json.dumps(res)


'''改翻页'''
@app.route('/scdetl', methods=['GET', 'POST'])
def scdetl():
    cid = request.values.get("cid")
    conn = con()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM COURSE WHERE CID = '" + cid + "'"
    cursor.execute(sql)
    cinfo = cursor.fetchall()
    sql = "SELECT * FROM TEACHER WHERE TID = (SELECT TID FROM TC WHERE CID = '" + cid + "')"
    cursor.execute(sql)
    tinfo = cursor.fetchall()
    res = (cinfo, tinfo)
    return json.dumps(res)

@app.route('/download', methods=['GET', 'POST'])
def download():
    name = request.values.get("name")
    f = request.values.get("fl")
    print(f)
    file = open('static/files/' + name + '.txt', 'w')
    file.write(str(f))
    file.close()
    path = 'static/files/' + name + '.txt'
    bucket.put_object_from_file('files/' + name + '.txt', path)
    return 'yes'

@app.route('/delusr', methods=['GET', 'POST'])
def delusr():
    id = request.values.get("id")
    conn = con()
    cursor = conn.cursor()
    sql = "DELETE FROM SC WHERE SID = '" + id + "'"
    cursor.execute(sql)
    sql = "DELETE FROM STUINFO WHERE ID = '" + id + "'"
    cursor.execute(sql)
    sql = "DELETE FROM SUSER WHERE ID = '" + id + "'"
    cursor.execute(sql)
    return 'yes'



if __name__ == '__main__':
    app.run()
