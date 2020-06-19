
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

const graphDefinition = 'graph TB\na-->b';
const renderCallback = function(svgGraph){
    // console.log(svgGraph)
    var ele = document.getElementById('preview')
    ele.innerHTML = svgGraph
};

function updatePreview(){
    try {
        var editor = document.getElementById("editor")
        var preview = document.getElementById("preview")
        console.log(editor.value)
        mermaid.render('result',editor.value,renderCallback,preview);
    } catch (error) {
        console.log(error)
    }
}
