export default function init() {

}

export function highlight() {
    document.body.addEventListener("mouseover", function (e) {
        alert(e.target.id)
    })
}

export function dehighlight() {
    document.body.addEventListener("mouseout", function (e) {
        alert(e.target.id)
    })
}