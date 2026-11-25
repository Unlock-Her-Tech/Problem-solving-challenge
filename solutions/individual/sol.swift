

func func1(_ input: [Int] , _ target: Int) -> Int {
    
    var map :[Int:Int] = [:]
    var c = 0
    
    for num in input{
        if let x = map[target - num]{
            c += x
        }
        
        map[num , default: 0] += 1
    }
    
    return c
    
}

let q = func1([3, 3, 3] , 6)
print(q)
