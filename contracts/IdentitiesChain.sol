pragma solidity ^0.5.0;

contract IdentitiesChain {
    
    struct Usuario{
        string usuario;
        string clave;
        Cedula cedula;
    }
    
    struct Cedula{
        string nombre;
        string gs;
        string rh;
        uint fecha;
        string sexo;
        string ciudad;
        string departamento;
    }
    
    address usuarioActivo;
    mapping(address => Usuario) usuarios;
   
   constructor() public {}
   
   function iniciarSesion(string memory _usuario, string memory _clave) public returns(bool){
       require(keccak256(abi.encodePacked((usuarios[msg.sender].usuario))) == keccak256(abi.encodePacked((_usuario))) && keccak256(abi.encodePacked((usuarios[msg.sender].clave))) == keccak256(abi.encodePacked((_clave))) );
       usuarioActivo = msg.sender;
       return true;
   }
   
   function nuevoUsuario(string memory _usuario, string memory _clave) public {

        Usuario memory user;
        user = usuarios[msg.sender];
        user.usuario = _usuario;
        user.clave = _clave;
    }
    
    function getUsuario() public view returns(string memory) {
        return usuarios[msg.sender].usuario;
    }
    
    function nuevaCedula(string memory _nombre, string memory _gs, string memory _rh, uint _fecha, string memory _sexo, string memory _ciudad, string memory _departamento) public {

        Cedula memory _cedula = usuarios[usuarioActivo].cedula;
        _cedula.nombre = _nombre;
        _cedula.gs = _gs;
        _cedula.rh = _rh;
        _cedula.fecha = _fecha;
        _cedula.sexo = _sexo;
        _cedula.ciudad = _ciudad;
        _cedula.departamento = _departamento;
    }
    
    function getCedula() public view returns(string memory, string memory, string memory , uint, string memory, string memory, string memory, address){
        Cedula memory _cedula = usuarios[usuarioActivo].cedula;
        return (_cedula.nombre, _cedula.gs, _cedula.rh, _cedula.fecha, _cedula.sexo, _cedula.ciudad, _cedula.departamento, usuarioActivo);
    }
   
}