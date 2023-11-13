class authController {
  // Constructor to inject the User model
  async login(request, response){
    const { email, password } = request.body;

   console.error(request.body); 
    if (email == 'test@gmail.com' && password == 'password'){
        response.status(200).json({     
            message: 'Login Sucssesful!',
            status: true,
            status_code: 200,
            data: []
        });
    } else{
        response.status(401).json({     
            message: 'Unauthorized',
            status: false,
            status_code: 401,
            data: []
        }); 
    }

}

async register(request, response){
    
}
}

module.exports = authController;
