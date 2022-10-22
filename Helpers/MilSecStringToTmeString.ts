const MilSecStringToTimeString = (milSec: string):string => {

    const mil = parseInt(milSec)

    const date = new Date(parseInt(milSec))
    const hours = ("0" + date.getUTCHours()).slice(-2)
    const minutes = ("0" + date.getUTCMinutes()).slice(-2)
    const seconds = ("0" + date.getUTCSeconds()).slice(-2)
    const milSeconds = ("00" + date.getUTCMilliseconds()).slice(-3, -1)

    console.log(`dddddddd ${date.getUTCMilliseconds()}`)

    return hours + ":" + minutes + ":" + seconds + "." + milSeconds
       // return `${hours}:${minutes}:${seconds}.${milSeconds}`

}
export default MilSecStringToTimeString;