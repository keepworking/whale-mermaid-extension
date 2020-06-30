
var config = { // mermaid default define
    theme:'default',
    logLevel:'fatal',
    securityLevel:'strict',
    startOnLoad:true,
    arrowMarkerAbsolute:false,

    flowchart:{
        htmlLabels:true,
        curve:'linear',
    },
    sequence:{
        diagramMarginX:50,
        diagramMarginY:10,
        actorMargin:50,
        width:150,
        height:65,
        boxMargin:10,
        boxTextMargin:5,
        noteMargin:10,
        messageMargin:35,
        messageAlign:'center',
        mirrorActors:true,
        bottomMarginAdj:1,
        useMaxWidth:true,
        rightAngles:false,
        showSequenceNumbers:false,
    },
    gantt:{
        titleTopMargin:25,
        barHeight:20,
        barGap:4,
        topPadding:50,
        leftPadding:75,
        gridLineStartPadding:35,
        fontSize:11,
        fontFamily:'"Open-Sans", "sans-serif"',
        numberSectionStyles:4,
        axisFormat:'%Y-%m-%d',
    }
};

mermaid.initialize(config);

const umlReferece = {
    "Flow Chart" : `graph TD
	A[Christmas] -->|Get money| B(Go shopping)
	B --> C{Let me think}
	C -->|One| D[Laptop]
	C -->|Two| E[iPhone]
	C -->|Three| F[fa:fa-car Car]
`,
    "Sequence Diagram" : `sequenceDiagram
	Alice->>+John: Hello John, how are you?
	Alice->>+John: John, can you hear me?
	John-->>-Alice: Hi Alice, I can hear you!
	John-->>-Alice: I feel great!`,
    "Class Diagram" : `classDiagram
	Animal <|-- Duck
	Animal <|-- Fish
	Animal <|-- Zebra
	Animal : +int age
	Animal : +String gender
	Animal: +isMammal()
	Animal: +mate()
	class Duck{
		+String beakColor
		+swim()
		+quack()
	}
	class Fish{
		-int sizeInFeet
		-canEat()
	}
	class Zebra{
		+bool is_wild
		+run()
	}`,
    "State Diagram" : `stateDiagram
	[*] --> Still
	Still --> [*]

	Still --> Moving
	Moving --> Still
	Moving --> Crash
	Crash --> [*]`,
    "Gantt Diagram" : `gantt
	title A Gantt Diagram
	dateFormat  YYYY-MM-DD
	section Section
	A task           :a1, 2014-01-01, 30d
	Another task     :after a1  , 20d
	section Another
	Task in sec      :2014-01-12  , 12d
	another task      : 24d`,
    "Pie Chart" : `pie title Pets adopted by volunteers
	"Dogs" : 386
	"Cats" : 85
	"Rats" : 15`,
    "ER Diagram" : `erDiagram
    CUSTOMER }|..|{ DELIVERY-ADDRESS : has
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER ||--o{ INVOICE : "liable for"
    DELIVERY-ADDRESS ||--o{ ORDER : receives
    INVOICE ||--|{ ORDER : covers
    ORDER ||--|{ ORDER-ITEM : includes
    PRODUCT-CATEGORY ||--|{ PRODUCT : contains
    PRODUCT ||--o{ ORDER-ITEM : "ordered in"`,
}

function DrawImage(svg){
    var oldImage = document.getElementById("copyImage")
    
    if(oldImage) {
        oldImage.remove();
    }

    var preview = document.getElementById("preview")
    
    var b64Head = 'data:image/svg+xml;base64,'
    var b64Body = btoa(svg)
    var b64Src = b64Head + b64Body

    var img = document.createElement("img")

    img.id = "copyImage"
    img.src = b64Src

    preview.appendChild(img)
}

const renderCallback = function(svgGraph){
    var ele = document.getElementById('preview')
    ele.innerHTML = svgGraph
    DrawImage(svgGraph)
};

function updatePreview(){
    try {
        var editor = document.getElementById("editor")
        var preview = document.getElementById("preview")
        mermaid.render('result',editor.value,renderCallback,preview)
    } catch (error) {
        console.log(error)
    }
}

function pageInit() {
    var references = document.getElementById("references")
    var editor = document.getElementById("editor")

    editor.oninput = updatePreview

    for (var key in umlReferece) { // load reference buttons
        var button = document.createElement("button")
        button.innerText = key
        button.onclick = function() {
            var editor = document.getElementById("editor")
            editor.value = umlReferece[this.innerText]
            updatePreview()
        }
        references.appendChild(button)
    }

}

pageInit()