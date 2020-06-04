<?php
/**
 * Project Language Class/ Interface
 */

class Lang{
	public $phrases = array();
	
	function __construct(){
                $value = get_session('lang');
		$lang = (!empty($value) ? $value : DEFAULT_LANGUAGE);
		
		if(file_exists("languages/$lang.ini")){
			$this->phrases = parse_ini_file("languages/$lang.ini");
		}
	}
	
	/**
     * Get a language phrase with a key
     * @return string
     */
	public function get_phrase($key){
		$phrase = isset($this->phrases[$key]) ? $this->phrases[$key] : null;
		return $phrase;
	}
	
}