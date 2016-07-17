<?php

class Database{
	
	private $host;
	private $username;
	private $password;
	private $dbname;
	private $mysqli;
	private $active;
	
	public function __construct(){
		$this->host = "localhost";
		$this->username = "antenuccibernardistim";
		$this->dbname = "my_antenuccibernardistim";
		$this->password = "";
		$this->active = false;
	}
	
	public function connect(){
		if($this->active)
			return;
		$this->mysqli = new mysqli($this->host, $this->username, $this->password, $this->dbname);
		if (mysqli_connect_errno()) {
			echo "Error connecting to database";
			exit();
		}
		$this->active = true;
	}
	
	public function close(){
		if($this->active){
			if($this->mysqli->close()){
				$this->active = false; 
				return true; 
			}else{
				return false; 
			}
		}
	}
	
	private function check_connection(){
		if(!$this->active)
			$this->connect();
	}
	
	public function get_records($query){
		$this->check_connection();
		$query = trim($query);
		$return = array();
		$this->mysqli->query('SET CHARACTER SET utf8');
		if($result = $this->mysqli->query($query, MYSQLI_USE_RESULT)){
			while($obj = $result->fetch_object()){
				$return[] = $obj;
			}
			$result->close();
		}
		return $return;
	}
	
	public function escape_string($str){
		$this->check_connection();
		return trim($this->mysqli->real_escape_string($str));
	}
}

global $DB;
$DB = new Database();

?>