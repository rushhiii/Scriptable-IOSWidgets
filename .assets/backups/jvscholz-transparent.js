// Change to true to see a preview of your widget.
const testMode = true

// Optionally specify the size of your widget preview.
const widgetPreview = "large"

/* -- GREETING AND DATE -- */

// Optionally show a greeting based on the time of day.
const showGreeting = true

// Choose the date style. "iOS" matches the default calendar app (like: THURSDAY 29)
// Or, use docs.scriptable.app/dateformatter to write your own format.
const dateDisplay = "EEEE"

/* -- EVENTS -- */

// Change to false to hide events.
const showEvents = true

// Choose whether to show all-day events.
const showAllDay = false

// Specify how many events to show.
const numberOfEvents = 4

// Optionally show tomorrow's events.
const showTomorrow = false

// Write a message when there are no events, or change to "" for blank.
const noEventMessage = "Keep happy and keep smiling."

/* -- SPACING -- */

// Can be top, middle, or bottom.
const verticalAlignment = "middle"

// Can be left, center, or right.
const horizontalAlignment = "left"

// The spacing between each element. 
const elementSpacing = 12

/* -- FONTS AND TEXT -- */

// Use iosfonts.com, or change to "" for the system font.
const fontName = "Futura-Medium"

// Find colors on htmlcolorcodes.com
const fontColor = new Color("#ffffff")

const date = new Date()

const resetWidget = false

// Change the font sizes for each element.
const greetingSize = 17
const dateSize = 25
const dayOfWeekSize = 25
const eventTitleSize = 14
const eventTimeSize = 10
const noEventMessageSize = 14
const shawnTextSize = 29

const files = FileManager.local()
const path = files.joinPath(files.documentsDirectory(), Script.name() + ".jpg")

// If we're in the widget or testing, build the widget.
if (config.runsInWidget || (testMode && files.fileExists(path) && !resetWidget)) {
  const widget = new ListWidget()
  if (files.fileExists(path)) widget.backgroundImage = files.readImage(path)

  if (verticalAlignment == "middle" || verticalAlignment == "bottom") {
    widget.addSpacer()
  }

  // Format the greeting if we need it.
  if (showGreeting) {
    let greetingText = makeGreeting()
    let greeting = widget.addText(greetingText)
    formatText(greeting, greetingSize)
    widget.addSpacer(elementSpacing)
  }

  // Format the date info.
  let df = new DateFormatter()
  if (dateDisplay.toLowerCase() == "ios") {
    df.dateFormat = "EEEE"
    let dayOfWeek = widget.addText(df.string(date).toUpperCase())
    let dateNumber = widget.addText(date.getDate().toString())

    formatText(dayOfWeek, dayOfWeekSize)
    formatText(dateNumber, dateSize)
  } else {
    df.dateFormat = dateDisplay
    var dateText = widget.addText(df.string(date))
    formatText(dateText, dateSize)
  }
  
  var option = {month:'long', day:'numeric'}
  let shawn = widget.addText(new Date().toLocaleDateString("en-US", option).toString())
  formatText(shawn, shawnTextSize)

  // Add events if we're supposed to.
  if (showEvents) {
    // Your existing event display code here
    // [Previous event handling code remains unchanged]
  }

  if (verticalAlignment == "top" || verticalAlignment == "middle") {
    widget.addSpacer()
  }

  Script.setWidget(widget)
  if (testMode) {
    let widgetSizeFormat = widgetPreview.toLowerCase()
    if (widgetSizeFormat == "small")  { widget.presentSmall()  }
    if (widgetSizeFormat == "medium") { widget.presentMedium() }
    if (widgetSizeFormat == "large")  { widget.presentLarge()  }
  }
  Script.complete()

} else {
  // Background setup code
  let message = "Before you start, edit your home screen (wiggle mode). Scroll to the empty page on the far right and take a screenshot."
  const shouldExit = await generateAlert(message, ["Continue", "Exit to Take Screenshot"])
  if (shouldExit.index) return
  
  let img = await Photos.fromLibrary()
  const height = img.size.height
  let phone = phoneSizes(height)
  if (!phone) {
    message = "It looks like you selected an image that isn't an iPhone screenshot, or your iPhone is not supported. Try again with a different image."
    return await generateAlert(message, ["OK"])
  }
  
  if (phone.text) {
    message = "What size are your home screen icons?"
    const textOptions = [{key: "text", value: "Small (has labels)"}, {key: "notext", value: "Large (no labels)"}]
    const textResponse = await generateAlert(message, textOptions)
    phone = phone[textResponse.key]
  }
  
  message = "What size of widget are you creating?"
  const sizes = {small: "Small", medium: "Medium", large: "Large"}
  const sizeOptions = [sizes.small, sizes.medium, sizes.large]
  const size = (await generateAlert(message, sizeOptions)).value
  
  message = "What position will it be in?"
  message += (height == 1136 ? " (Note that your device only supports two rows of widgets, so the middle and bottom options are the same.)" : "")
  
  let positions
  if (size == sizes.small) {
    positions = ["Top left","Top right","Middle left","Middle right","Bottom left","Bottom right"]
  } else if (size == sizes.medium) {
    positions = ["Top","Middle","Bottom"]
  } else if (size == sizes.large) {
    positions = [{key: "top", value: "Top"}, {key: "middle", value: "Bottom"}]
  }
  const position = (await generateAlert(message, positions)).key

  const crop = { 
    w: (size == sizes.small ? phone.small : phone.medium),
    h: (size == sizes.large ? phone.large : phone.small),
    x: (size == sizes.small ? phone[position.split(" ")[1]] : phone.left),
    y: phone[position.toLowerCase().split(" ")[0]]
  }
  
  const draw = new DrawContext()
  draw.size = new Size(crop.w, crop.h)
  draw.drawImageAtPoint(img, new Point(-crop.x, -crop.y))  
  img = draw.getImage()
  
  message = "Your widget background is ready. Would you like to use it as this script's background, or export the image?"
  const exports = {script: "Use for this script", photos: "Export to Photos", files: "Export to Files"}
  const exportOptions = [exports.script, exports.photos, exports.files]
  const exportValue = (await generateAlert(message, exportOptions)).value
  
  if (exportValue == exports.script) {
    files.writeImage(path, img)
  } else if (exportValue == exports.photos) {
    Photos.save(img)
  } else if (exportValue == exports.files) {
    await DocumentPicker.exportImage(img)
  }
}

// Helper functions
async function generateAlert(message, options) {
  const alert = new Alert()
  alert.message = message
  
  const isObject = options[0].value
  for (const option of options) {
    alert.addAction(isObject ? option.value : option)
  }
  
  const index = await alert.presentAlert()
  return { 
    index: index, 
    value: isObject ? options[index].value : options[index],
    key: isObject ? options[index].key : options[index]
  }
}

function phoneSizes(inputHeight) {
  return {
    // 16 Pro Max
    "2868": {
      text: {
        small: 510,
        medium: 1092,
        large: 1146,
        left: 114,
        right: 696,
        top: 276,
        middle: 912,
        bottom: 1548
      },
      notext: {
        small: 530,
        medium: 1138,
        large: 1136,
        left: 91,
        right: 699,
        top: 276,
        middle: 882,
        bottom: 1488
      } 
    },
    
    // 16 Plus, 15 Plus, 15 Pro Max, 14 Pro Max
    "2796": {
      text: {
        small: 510,
        medium: 1092,
        large: 1146,
        left: 98,
        right: 681,
        top: 252,
        middle: 888,
        bottom: 1524
      },
      notext: {
        small: 530,
        medium: 1139,
        large: 1136,
        left: 75,
        right: 684,
        top: 252,
        middle: 858,
        bottom: 1464
      }
    },
    
    // 16 Pro
    "2622": {
      text: {
        small: 486,
        medium: 1032,
        large: 1098,
        left: 87,
        right: 633,
        top: 261,
        middle: 872,
        bottom: 1485
      },
      notext: {
        small: 495,
        medium: 1037,
        large: 1035,
        left: 84,
        right: 626,
        top: 270,
        middle: 810,
        bottom: 1350
      } 
    },

    // 16, 15, 15 Pro, 14 Pro
    "2556": {
      text: {
        small: 474,
        medium: 1017,
        large: 1062,
        left: 81,
        right: 624,
        top: 240,
        middle: 828,
        bottom: 1416
      },
      notext: {
        small: 495,
        medium: 1047,
        large: 1047,
        left: 66,
        right: 618,
        top: 243,
        middle: 795,
        bottom: 1347
      }
    }
  }[inputHeight]
}

// Your existing helper functions
function makeGreeting() {
  let greeting = "Good "
  if (date.getHours() < 4) {
    greeting = greeting + "night."
  } else if (date.getHours() < 12) {
    greeting = greeting + "morning."
  } else if (date.getHours() < 17) {
    greeting = greeting + "afternoon."
  } else if (date.getHours() < 20) {
    greeting = greeting + "evening."
  } else {
    greeting = greeting + "night."
  }
  return greeting
}

function shouldShowEvent(event) {
  if (event.title.startsWith("Canceled:")) {
    return false
  }
  if (event.isAllDay) {
    return showAllDay
  }
  return (event.startDate.getTime() > date.getTime())
}

function provideFont(fontName, fontSize) {
  if (fontName == "" || fontName == null) {
    return Font.regularSystemFont(fontSize)
  } else {
    return new Font(fontName, fontSize)
  }
}

function displayEvent(widget, event) {
  widget.addSpacer(elementSpacing)
  let title = widget.addText(event.title)
  formatText(title, eventTitleSize)
  if (event.isAllDay) { return }
  widget.addSpacer(7)
  let time = widget.addText(formatTime(event.startDate))
  formatText(time, eventTimeSize)
}

function formatTime(date) {
  let df = new DateFormatter()
  df.useNoDateStyle()
  df.useShortTimeStyle()
  return df.string(date)
}

function formatText(textItem, fontSize) {
  textItem.font = provideFont(fontName, fontSize)
  textItem.textColor = fontColor
  if (horizontalAlignment == "right") {
    textItem.rightAlignText()
  } else if (horizontalAlignment == "center") {
    textItem.centerAlignText()
  } else {
    textItem.leftAlignText()
  }
}

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}
