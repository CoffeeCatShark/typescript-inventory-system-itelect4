import { useState } from "react"
import type { Manager } from "../types/types"
import { add } from "../data/helpers"
import { globalID, incrementID } from "../data/database"
import { AuthorizationLvl } from "../types/types"

interface AddManagerPageProps {
    managerList: Manager[];
    setManagerList: React.Dispatch<React.SetStateAction<Manager[]>>;
}

function AddManagerPage({
    managerList,
    setManagerList,
}: AddManagerPageProps) {
    const [managerName, setManagerName] = useState("")
    const [authLevel, setAuthLevel] = useState(AuthorizationLvl.Pending)


    function AddNewManager(){
        const newManager: Manager = {
            managerID: globalID,
            managerName,
            authLevel
        }
        incrementID
        add(managerList, newManager)
        setManagerList([...managerList])

        //for clearing entry 

        setManagerName("")
        setAuthLevel(AuthorizationLvl.Pending)
    }

    return (<>
    
     <input
                placeholder="Manager Name"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
            />
    
     <select
                     value={authLevel}
                     onChange={(e) => setAuthLevel(e.target.value as AuthorizationLvl)}
                 >
                     <option value={AuthorizationLvl.High}>High</option>
                     <option value={AuthorizationLvl.Low}>Low</option>
                     <option value={AuthorizationLvl.Pending}>Pending</option>
                 </select>

    </>)
}