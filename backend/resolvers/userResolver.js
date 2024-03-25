const User=require("../models/userModal")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const config=require("config")

const createUser=(args,req)=>{
//    if(!req.isAuth || req.role!=="admin"){
//         return new Error("Ne možete dodati korisnika. Prijavitese kao administrator!")
//     }
    const {firstName,lastName,email,password}=args.userInput
    if(!firstName|| !lastName || !email || !password)
      { return new Error("Niste uneli sve potrebne podatke !")}
    return User.findOne({email})
    .then(user=>{
        if(user)
            return new Error("Korisnik već postoji")
        return bcrypt.genSalt(10)
            .then(salt=>{
               return bcrypt.hash(password,salt)
                        .then(hash=>{
                            const newUser=new User({
                                firstName,
                                lastName,
                                email,
                                password:hash,
                                role: "user"
                            })
                           return newUser.save()
                                    .then(newuser=>{
                                        return {...newuser._doc}
                                    })
                                    .catch(err=>console.log(err))
                        })
                        .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}

const users=(args,req)=>{
    // if(!req.isAuth || req.role!=="admin"){
    //     return new Error("Ne možete pristupiti korisnicima!")
    // }
    return User.find({})
        .then(users=>{
            return users.map(user=>{
                return {...user._doc}
            })
        })
        .catch(err=>console.log(err))
}

const ordinaryUsers=(args,req)=>{
    if(!req.isAuth){
        return new Error("Ne možete pristupiti korisnicima! Prijavite se ponovo!")
    }
    return User.find({role:"user"})
        .then(users=>{
            return users.map(user=>{
                return {...user._doc}
        })
    })
    .catch(err=>console.log(err))
}

const findUser=(args,req)=>
{
    if(!req.isAuth || req.role!=="admin"){
        return new Error("Ne možete pristupiti korisnicima! Prijavite se ponovo!")
    }
    return User.findOne({_id:args.id})
    .then(user=>{
        return{...user._doc}
    })
    .catch(err=>new Error(err))
}

const deleteUser=(args,req)=>{
    // if(!req.isAuth || req.role!=="admin"){
    //     return new Error("Ne možete pristupiti korisnicima! Prijavite se ponovo!")
    // }
    const{id}=args
    return User.findByIdAndDelete({_id:id})
                .then(user=>{
                    return {...user._doc}
                })
                .catch(err=>console.log(err))           
}

const updateUser=(args,req)=>{
    if(!req.isAuth || req.role!=="admin"){
        return new Error("Ne možete pristupiti korisnicima! Prijavite se ponovo!")
    }
    const{id,firstName,lastName, email}=args
    if(!firstName || !lastName || !email){
        return new Error("Unesite sve potrebne podatke!")
    }
    return User.findByIdAndUpdate({_id:id},{$set:{firstName,lastName,email}},{new:true})
                .then(user=>{
                    return {...user._doc}
                })
                .catch(err=>console.log(err))

}

const login=(args)=>{
    const{email,password}=args.loginInput
    console.log(args)
    if(!email || !password){
        return new Error("Unesite sve potrebne podatke!")
    }
    return User.findOne({email})
                .then(user=>{
                    if(!user){ 
                        return new Error("Korisnik nije pronađen!")
                    }
                    return bcrypt.compare(password,user.password)
                            .then(isMatch=>{
                                if(!isMatch){
                                    return new Error("Pogrešna lozinka")
                                }
                                console.log(process.env.SECRETKEY)
                                const token=jwt.sign({role:user.role,expiresIn:60*60},process.env.SECRETKEY,{expiresIn:60*60}  )
                                return{
                                    id:user._id,
                                    token,
                                    firstName:user.firstName,
                                    lastName:user.lastName,
                                    email:user.email,
                                    tokenExpiration: 60*60 +Math.floor(new Date().getTime()/1000),
                                    role:user.role
                                }                             
                            })
                            .catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
}
const changePassword=(args,req)=>{
    if(!req.isAuth || (req.role!=="admin" && req.role!=="user")){
        return new Error("Ne možete promeniti lozinku! Prijavite se ponovo!")
    }
    const {id,password,newPassword,confirmation}=args
    if(!password || !newPassword || !confirmation) {
        return new Error("Unesite sve potrebne podatke!")
    } 
    if(newPassword!==confirmation){
        return new Error("Lozinke se ne poklapaju!")
    }
    return User.findById({_id:id})
                .then(user=>{
                    if(!user){
                        return new Error("Korisnik nije pronađen!")
                    }
                    return bcrypt.compare(password,user.password)
                                .then(isMatch=>{
                                    if(!isMatch){
                                        return new Error("Pogrešna lozinka!")
                                    }
                                    return bcrypt.genSalt(10)
                                                    .then(salt=>{
                                                        return bcrypt.hash(newPassword,salt)
                                                                    .then(hash=>{
                                                                       return User.findByIdAndUpdate({_id:id},{password:hash},{new:true})
                                                                            .then(result=>{
                                                                                return {...result._doc}
                                                                            })
                                                                            .catch(err=>console.log(err))
                                                                    })
                                                                    .catch(err=>console.log(err))
                                                    })
                                                    .catch(err=>console.log(err))
                                })
                                .catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
}

module.exports={
    createUser,
    users,
    ordinaryUsers,
    findUser,
    deleteUser,
    updateUser,
    login,
    changePassword
}