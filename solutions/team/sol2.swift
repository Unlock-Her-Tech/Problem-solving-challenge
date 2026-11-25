func func2 (_ input:[Int] , _ k:Int) -> Int{
    
    if k == 0 || input.isEmpty{
        return 0
    }
    
    var freq :[Int:Int] = [:]
    var left = 0
    var res = 0
    
    
    for right in 0..<input.count{
        let num = input[right]
        freq[num , default: 0] += 1
        
        while freq.count > k{
            let leftNum = input[left]
            freq[leftNum , default: 0] -= 1
            
            if freq[leftNum] == 0{
                freq.removeValue(forKey: leftNum)
            }
            left += 1
        }
        
        res = max(res , right - left + 1)
        
    }
    
    return res
}

print(func2([1, 2, 1, 2, 3] , 2))