<?php

require 'Slim/Slim.php';


$app = new Slim();

$app->get('/users', 'getUsers');
$app->get('/users/:id', 'getUser');
$app->post('/users/:username/:password', 'getLoginUser');
$app->get('/clients', 'getClients');
$app->get('/personnel', 'getPersonnel');
$app->get('/consorts', 'getConsorts');
$app->get('/tests', 'getTests');


$app->get('/issues/:issueID', 'getOneIssues');
$app->post('/issues', 'addIssue');
$app->put('/issues/:id', 'updateIssue');
$app->delete('/issues/:id', 'deleteIssue');

$app->run();

function getUsers() {
	$sql = "select * FROM users ORDER BY last_name";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$users = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($users);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getLoginUser($uname, $pass) {
    $sql = "SELECT users.user_id,
            	users.username,
            	users.email,
            	users.first_name,
            	users.last_name,
            	users.access_id,
            	users.password,
            	users.active
            FROM users
            WHERE users.username='$uname' and users.password ='$pass'";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("username", $uname);
        $stmt->bindParam("password", $pass);
        $stmt->execute();
        $user = $stmt->fetchObject();
        $db = null;
        echo json_encode($user);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getUser($id) {
    $sql = "SELECT * FROM users
   WHERE users.userID=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $issue = $stmt->fetchObject();
        $db = null;
        echo json_encode($issue);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getClients() {
    $sql = "SELECT * FROM client";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $clients = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($clients);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getConsorts() {
    $sql = "SELECT * FROM consortium";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $consorts = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($consorts);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getTests() {
    $sql = "SELECT * FROM test ORDER BY test_name ASC";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $tests = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($tests);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


function getPersonnel() {
    $sql = "SELECT * FROM personnel";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $personnel = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($personnel);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}



function getOneIssues($id) {
    $sql = "SELECT users.firstName,users.lastName,issue.dateCreated,issue.dateRevised,issue.dateClosed,issue.description,issue.issueID
  FROM issue
  INNER JOIN users ON issue.userID = users.userID
   WHERE issue.issueID=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $issue = $stmt->fetchAll(PDO::FETCH_OBJ);//fetchObject();
        $db = null;
        echo json_encode($issue);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


function updateIssue($id) {
    $request = Slim::getInstance()->request();
    $body = $request->getBody();
    $issue = json_decode($body);
    $sql = "UPDATE issue SET  userID=:userID, dateCreated=:dateCreated, dateRevised=:dateRevised, description=:description, dateClosed=:dateClosed, resolvedDescrip=:resolvedDescrip, resolvedBy=:resolvedBy WHERE issueID=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("userID", $issue->userID);
        $stmt->bindParam("dateCreated", $issue->dateCreated);
        $stmt->bindParam("dateRevised", $issue->dateRevised);
        $stmt->bindParam("description", $issue->description);
        $stmt->bindParam("dateClosed", $issue->dateClosed);
        $stmt->bindParam("resolvedDescrip", $issue->resolvedDescrip);
        $stmt->bindParam("resolvedBy", $issue->resolvedBy);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
        echo json_encode($issue);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function deleteIssue($id) {
    $sql = "DELETE FROM issue WHERE issueID=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}



function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="smaloney";
	$dbpass="@sabasean";
	$dbname="safetest";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}