class JllCalendarHtmlRenderer 
{
    constructor(controller)
    {
        this.controller = controller
        this.el_input = null

        this._createStructure()
        this._attachEventListeners()
        this._attachInput(this.controller._config.input, true)
    }

    _createStructure() 
    {
        this.el_jll_calendar = this._createElement("div", "jll-calendar " + (this.controller._config.cssClasses || ""))
        this.el_jll_calendar.setAttribute('id', this.controller._config.id)

        this.el_wrapper = this._createElement("div", "jll-calendar__wrapper")

        this.el_header = this._createElement("div", "jll-calendar__header")

        this.el_header_div1 = this._createElement("div", "")
        this.el_button_1 = this._createElement("button", "goto-previous-month"); this.el_button_1.textContent = "ماه قبل"; this.el_header_div1.appendChild(this.el_button_1)

        this.el_header_div2 = this._createElement("div", "")
        this.el_button_2 = this._createElement("button", "open-month-selector"); this.el_header_div2.appendChild(this.el_button_2)
        this.el_button_3 = this._createElement("button", "open-year-selector"); this.el_header_div2.appendChild(this.el_button_3)

        this.el_header_div3 = this._createElement("div", "")
        this.el_button_4 = this._createElement("button", "goto-next-month"); this.el_button_4.textContent = "ماه بعد"; this.el_header_div3.appendChild(this.el_button_4)

        this.el_header.appendChild(this.el_header_div1); this.el_header.appendChild(this.el_header_div2); this.el_header.appendChild(this.el_header_div3)

        this.el_overlay_1 = this._createElement("div", "jll-calendar__overlay month-selector")

        this.el_overlay_1_div1 = this._createElement("div", "jll-calendar__overlay__top")
        this.el_button_5 = this._createElement("button", "close"); this.el_button_5.textContent = "بستن"; this.el_overlay_1_div1.appendChild(this.el_button_5)

        this.el_overlay_1_div2 = this._createElement("div", "options")

        this.el_overlay_1.appendChild(this.el_overlay_1_div1); this.el_overlay_1.appendChild(this.el_overlay_1_div2)
        
        this.el_overlay_2 = this._createElement("div", "jll-calendar__overlay year-selector")

        this.el_overlay_2_div1 = this._createElement("div", "jll-calendar__overlay__top")
        this.el_button_6 = this._createElement("button", "close"); this.el_button_6.textContent = "بستن"; this.el_overlay_2_div1.appendChild(this.el_button_6)

        this.el_overlay_2_div2 = this._createElement("div", "options")

        this.el_overlay_2.appendChild(this.el_overlay_2_div1); this.el_overlay_2.appendChild(this.el_overlay_2_div2)

        this.el_day_names = this._createElement("div", "jll-calendar__day-names")
        
        this.el_day_names_span1 = this._createElement("span", ""); this.el_day_names_span1.textContent = "شنبه"
        this.el_day_names_span2 = this._createElement("span", ""); this.el_day_names_span2.textContent = "یکشنبه"
        this.el_day_names_span3 = this._createElement("span", ""); this.el_day_names_span3.textContent = "دوشنبه"
        this.el_day_names_span4 = this._createElement("span", ""); this.el_day_names_span4.textContent = "سه شنبه"
        this.el_day_names_span5 = this._createElement("span", ""); this.el_day_names_span5.textContent = "چهارشنبه"
        this.el_day_names_span6 = this._createElement("span", ""); this.el_day_names_span6.textContent = "پنجشنبه"
        this.el_day_names_span7 = this._createElement("span", ""); this.el_day_names_span7.textContent = "جمعه"

        this.el_day_names.appendChild(this.el_day_names_span1); this.el_day_names.appendChild(this.el_day_names_span2); 
        this.el_day_names.appendChild(this.el_day_names_span3); this.el_day_names.appendChild(this.el_day_names_span4); 
        this.el_day_names.appendChild(this.el_day_names_span5); this.el_day_names.appendChild(this.el_day_names_span6); 
        this.el_day_names.appendChild(this.el_day_names_span7);

        this.el_month_days = this._createElement("div", "jll-calendar__month-days")
        
        this.el_footer = this._createElement("div", "jll-calendar__footer")

        this.el_footer_div1 = this._createElement("div", "")
        this.el_button_7 = this._createElement("button", "goto-today"); this.el_button_7.textContent = "امروز"; this.el_footer_div1.appendChild(this.el_button_7)

        this.el_footer_div2 = this._createElement("div", "")
        this.el_button_9 = this._createElement("button", "float-clear"); this.el_button_9.textContent = "خالی کردن"; this.el_footer_div2.appendChild(this.el_button_9)
        this.el_button_8 = this._createElement("button", "float-close"); this.el_button_8.textContent = "بستن"; this.el_footer_div2.appendChild(this.el_button_8)

        this.el_footer.appendChild(this.el_footer_div1); this.el_footer.appendChild(this.el_footer_div2)

        this.el_wrapper.appendChild(this.el_header)
        this.el_wrapper.appendChild(this.el_overlay_1)
        this.el_wrapper.appendChild(this.el_overlay_2)
        this.el_wrapper.appendChild(this.el_day_names)
        this.el_wrapper.appendChild(this.el_month_days)
        this.el_wrapper.appendChild(this.el_footer)

        this.el_jll_calendar.appendChild(this.el_wrapper)

        if(this.controller._config.container) 
        {    
            let container = document.querySelector(this.controller._config.container)

            if(! container) {
                console.error(`JllCalendar: Container "${this.controller._config.container}" not found!`)
                return;
            }

           container.appendChild(this.el_jll_calendar)
        }
        else {
            document.body.appendChild(this.el_jll_calendar)
        }
    }

    _attachEventListeners()
    {
        this.el_jll_calendar.addEventListener("click", (event) => 
        {
            let isParent = event.target.classList.contains("jll-calendar") && event.target.classList.contains("style--float")
            
            if(isParent && this.controller._config.outsideClose) {
                this.el_jll_calendar.classList.remove("style--show")
            }

        })

        this.el_button_2.addEventListener("click", () => 
        {
            this._createMonthOptions()

            this.el_overlay_1.classList.add("style--show")
        })
        
        this.el_button_3.addEventListener("click", () => 
        {
            this._createYearOptions()

            this.el_overlay_2.classList.add("style--show")

            let target = this.el_overlay_2_div2.querySelector(".active")
            target.scrollIntoView()
        })
        
        this.el_button_5.addEventListener("click", () => {
            this.el_overlay_1.classList.remove("style--show")
        })
        
        this.el_button_6.addEventListener("click", () => {
            this.el_overlay_2.classList.remove("style--show")
        })
        
        this.el_button_1.addEventListener("click", () => {
            this.controller._displayMonth(-1)
        })
        
        this.el_button_4.addEventListener("click", () => {
            this.controller._displayMonth(1)
        })
        
        this.el_button_7.addEventListener("click", () => {
            this.controller._gotoToday()
        })
        
        this.el_button_8.addEventListener("click", () => {
            this.el_jll_calendar.classList.remove("style--show")
        })
        
        this.el_button_9.addEventListener("click", () => {
            this.controller.setValue(null)
        })
    }

    _attachInput(input, isFirstRender)
    {
        if(input)
        {
            this.el_input = document.querySelector(input)

            if(! this.el_input) {
                console.error(`JllCalendar: Input "${input}" not found!`)
                return;
            }

            this.el_jll_calendar.classList.add("style--float")

            this.el_input.addEventListener("focus", () => {
                this.el_jll_calendar.classList.add("style--show")
            })

            if(this.el_input.value != '') {
                this.controller._parseValue(this.el_input.value)
            }

            if(! isFirstRender) {
                this.controller._displayMonth()
            }
        }
        else {
            this.el_jll_calendar.classList.remove("style--float")
            this.el_input = null

            if(! isFirstRender) {
                this.controller._displayMonth()
            }
        }
    }

    _createMonthOptions()
    {
        this.el_overlay_1_div2.innerHTML = ""

        Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).forEach((monthIndex) => 
        {
            let el_month = this._createElement("button", "")

            el_month.textContent = this._getMonthName(monthIndex)

            if(this.controller._data.current.month == (monthIndex + 1)) {
                el_month.classList.add("active")
            }

            el_month.addEventListener("click", () => 
            {
                this.el_overlay_1.classList.remove("style--show")
                this.controller._onMonthChanged(monthIndex + 1)
            })
            
            this.el_overlay_1_div2.appendChild(el_month)
        })
    }

    _createYearOptions()
    {
        this.el_overlay_2_div2.innerHTML = ""

        let minYear = 1350
        let maxYear = 1450

        for(let year = minYear; year <= maxYear; year++)
        {
            let el_year = this._createElement("button", "")

            el_year.textContent = year

            if(this.controller._data.current.year == year) {
                el_year.classList.add("active")
            }

            el_year.addEventListener("click", () => 
            {
                this.el_overlay_2.classList.remove("style--show")
                this.controller._onYearChanged(year)
            })
            
            this.el_overlay_2_div2.appendChild(el_year)
        }
    }

    _createElement(type, className)
    {
        let element = document.createElement(type.toLowerCase())
        element.className = className

        if(type == "button") {
            element.type = "button"
        }

        return element
    }

    _getMonthName(index)
    {
        return [
            "فروردین" , "اردیبهشت" , "خرداد" ,
            "تیر" , "مرداد" , "شهریور" ,
            "مهر" , "آبان" , "آذر" ,
            "دی" , "بهمن" , "اسفند" ,
        ][index]
    }

    createMonthDays(dataMonthDays)
    {
        let month = dataMonthDays[0].month
        let year = dataMonthDays[0].year
        let nulled = dataMonthDays[0].dayOfWeek

        let el_day_selected = null
        let selectedDayInfo = null

        this.el_button_2.textContent = this._getMonthName(month - 1)
        this.el_button_3.textContent = year

        this.el_month_days.innerHTML = ""

        for(let n = 0; n < nulled; n++) 
        {
            let el_day = this._createElement("button", "style--hidden")
            this.el_month_days.appendChild(el_day)
        }

        dataMonthDays.forEach((currentDay) => 
        {
            let el_day = this._createElement("button", "")

            el_day.textContent = currentDay.dayOfMonth

            if(currentDay.dayOfWeek == 6) {
                el_day.classList.add("style--holiday")
            }

            if(currentDay.isToday) {
                el_day.classList.add("style--today")
            }

            let okMin = this.controller._compareWithMin(currentDay)
            let okMax = this.controller._compareWithMax(currentDay)
            
            if(okMin && okMax) 
            {
                if(this.controller._data.selected) 
                {
                    let selected = this.controller._data.selected
                    let selectedDay = selected.dayOfMonth || selected.day

                    if(selectedDay && selected.year == currentDay.year && selected.month == currentDay.month && currentDay.dayOfMonth == selectedDay) { 
                        el_day_selected = el_day
                        selectedDayInfo = currentDay
                    }
                }

                el_day.addEventListener("click", (event) => 
                {
                    let other_btns = this.el_month_days.querySelectorAll("button")
                    other_btns.forEach((btn) => btn.classList.remove("style--selected"))

                    el_day.classList.add("style--selected")

                    this.controller._data.selected = currentDay

                    if(this.el_input) {
                        this.el_input.value = this.controller.getValue()
                    }

                    if(this.controller._config.autoClose) {
                        this.el_jll_calendar.classList.remove("style--show")
                    }

                    let callbackOnClick = this.controller._config.onClick

                    if(callbackOnClick) {
                        callbackOnClick(currentDay, el_day, this.controller)
                    }
                })
            }
            else {
                el_day.classList.add("style--locked")
            }

            this.el_month_days.appendChild(el_day)
            
            let callbackOnRender = this.controller._config.onRender

            if(callbackOnRender) {
                callbackOnRender(currentDay, el_day, this.controller)
            }
        })

        if(el_day_selected) 
        {
            let other_btns = this.el_month_days.querySelectorAll("button")
            other_btns.forEach((btn) => btn.classList.remove("style--selected"))

            el_day_selected.classList.add("style--selected")

            this.controller._data.selected = selectedDayInfo

            if(this.el_input) {
                this.el_input.value = this.controller.getValue()
            }
        }
    }
}

class JllCalendar 
{
    constructor(id, config = {}) 
    {
        this._config = config
        this._config.id = id
        this._config.default_separator = `/`
        this._config.autoClose = this._config.autoClose == undefined ? true : this._config.autoClose
        this._config.outsideClose = this._config.outsideClose == undefined ? false : this._config.outsideClose
        
        this._data = {
            current : null ,
            selected : null
        }

        if(this._config.value) {
            this._parseValue(this._config.value)
        }

        this._parseMinValue()
        this._parseMaxValue()

        this._renderer = new JllCalendarHtmlRenderer(this)

        this._displayMonth()
    }
    
    getValue() 
    {
        let selectedDate = this._data.selected
        return selectedDate ? this._getDateString(selectedDate.year, selectedDate.month, selectedDate.dayOfMonth) : null
    }
    
    getSeparator() {
        return this._config.separator || this._config.default_separator
    }

    getMin() 
    {
        let date = this._config.min
        return date ? this._getDateString(date.year, date.month, date.day) : null
    }

    getMax() 
    {
        let date = this._config.max
        return date ? this._getDateString(date.year, date.month, date.day) : null
    }
    
    getAutoClose() {
        return this._config.autoClose
    }
    
    getOutsideClose() {
        return this._config.outsideClose
    }
    
    getInput() {
        return this._config.input ? this._renderer.el_input : null
    }

    setInput(selector) {
        this._config.input = selector
        this._renderer._attachInput(selector, false)
    }

    setValue(value) 
    {
        if(value) {
            this._parseValue(value)

            if(this._renderer.el_input) {
                this._renderer.el_input.value = this.getValue()
            }
        }
        else {
            this._data.selected = null
            
            if(this._renderer.el_input) {
                this._renderer.el_input.value = ''
            }
        }

        this._displayMonth()

        return this
    }

    setSeparator(value) 
    {
        this._config.separator = value
        return this
    }

    setOnRender(callback) 
    {
        this._config.onRender = callback
        return this
    }

    setOnClick(callback) 
    {
        this._config.onClick = callback
        return this
    }

    setAutoClose(value) {
        this._config.autoClose = value
        return this
    }

    setOutsideClose(value) {
        this._config.outsideClose = value
        return this
    }
    
    setMin(value) {
        this._config.min = value
        this._parseMinValue()
        this._displayMonth()
        return this
    }
    
    setMax(value) {
        this._config.max = value
        this._parseMaxValue()
        this._displayMonth()
        return this
    }
    
    _getDateString(y, m, d)
    {
        m = m > 9 ? m : "0" + m
        d = d > 9 ? d : "0" + d

        let separator = this.getSeparator()

        return y + separator + m + separator + d
    }

    _gotoToday()
    {
        this._data.current = JllCalendarDateHelper.getToday()
        this._displayMonth()
    }
    
    _onMonthChanged(newMonth)
    {
        this._data.current.month = newMonth
        this._displayMonth()
    }
    
    _onYearChanged(newYear)
    {
        this._data.current.year = newYear
        this._displayMonth()
    }

    _parseValue(value)
    {
        this._config.value = this._parseDateString(value)
        this._data.selected = this._config.value
    }
    
    _parseMinValue() {
        this._config.min = this._config.min ? this._parseDateString(this._config.min) : null
    }
    
    _parseMaxValue() {
        this._config.max = this._config.max ? this._parseDateString(this._config.max) : null
    }

    _parseDateString(value)
    {
        if(value == 'today') {
            return JllCalendarDateHelper.getToday()
        }

        let separator = this._config.separator || this._config.default_separator
        let new_value = value.trim().split(separator)

        return {
            year : parseInt(new_value[0].trim()) ,
            month : parseInt(new_value[1].trim()) ,
            day : parseInt(new_value[2].trim()) ,
        }
    }

    _compareWithMin(currentValue)
    {
        if(! this._config.min) {
            return true
        }

        let minValue = this._config.min
        let seperator = "_"

        let strMin = minValue.year + seperator + (minValue.month > 9 ? "" : "0") + minValue.month + seperator + (minValue.day > 9 ? "" : "0") + minValue.day
        let strCurrent = currentValue.year + seperator + (currentValue.month > 9 ? "" : "0") + currentValue.month + seperator + (currentValue.dayOfMonth > 9 ? "" : "0") + currentValue.dayOfMonth
    
        return strMin <= strCurrent
    }

    _compareWithMax(currentValue)
    {
        if(! this._config.max) {
            return true
        }
        
        let maxValue = this._config.max
        let seperator = "_"

        let strMax = maxValue.year + seperator + (maxValue.month > 9 ? "" : "0") + maxValue.month + seperator + (maxValue.day > 9 ? "" : "0") + maxValue.day
        let strCurrent = currentValue.year + seperator + (currentValue.month > 9 ? "" : "0") + currentValue.month + seperator + (currentValue.dayOfMonth > 9 ? "" : "0") + currentValue.dayOfMonth

        return strMax >= strCurrent
    }

    _displayMonth(step = 0)
    {
        if(! this._data.current) {
            this._data.current = this._data.selected || JllCalendarDateHelper.getToday()
        }

        this._data.current = this._rotateMonth(this._data.current, step)

        let dataMonthDays = this._getMonthDays(this._data.current)

        this._renderer.createMonthDays(dataMonthDays)
    }

    _getMonthDays ({ year, month, day })
    {
        let today = JllCalendarDateHelper.getToday()

        let monthFirst = 1
        let monthLast = JllCalendarDateHelper.getDaysInMonth(year, month)
        let monthDays = []

        for (let i = monthFirst; i <= monthLast; i++) 
        {
            monthDays.push(
            {
                year : year ,
                month : month ,
                dayOfMonth : i ,
                dayOfWeek : JllCalendarDateHelper.getWeekDay(year, month, i) ,
                isToday : i == today.day && month == today.month && year == today.year 
            })
        }

        return monthDays
    }

    _rotateMonth ({ year, month, day }, rotateValue)
    {
        let newMonth = month + rotateValue
        let newDay = day
        let newYear = year

        if (newMonth == 13) 
        {
            newMonth = 1
            newDay = 1
            newYear += 1
        }

        if (newMonth == 0) 
        {
            newMonth = 12
            newDay = 1
            newYear -= 1
        }

        return {
            year : newYear ,
            month : newMonth ,
            day : newDay ,
        }
    }
}

class JllCalendarDateHelper 
{
    static _mod (a, b) {
        return window.Math.abs(a - (b * window.Math.floor(a / b)))
    }

    static isLeapYear (jy) 
    {
        function div(a, b) {
            return ~~(a / b)
        }

        const breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178], 
              bl = breaks.length

        let jump = 0,
            leapJ = -14,
            jp = breaks[0],
            leap

        for (let i = 1; i < bl; i += 1) 
        {
            const jm = breaks[i]
            jump = jm - jp

            if (jy < jm) {
                break
            }

            leapJ = leapJ + div(jump, 33) * 8 + div(JllCalendarDateHelper._mod(jump, 33), 4)
            jp = jm
        }

        let n = jy - jp

        if (jump - n < 6) {
            n = n - jump + div(jump + 4, 33) * 33
        }

        leap = JllCalendarDateHelper._mod(JllCalendarDateHelper._mod(n + 1, 33) - 1, 4)

        if (leap === -1) {
            leap = 4
        }

        return leap === 0
    }

    static getToday () 
    {
        const date = new Date()

        let gy = parseInt(date.getFullYear())
        const gm = parseInt(date.getMonth()) + 1
        const gd = parseInt(date.getDate())

        let jy, days
        const gdm = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]

        if (gy > 1600) 
        {
            jy = 979
            gy -= 1600
        } 
        else 
        {
            jy = 0
            gy -= 621
        }

        const gy2 = (gm > 2) ? (gy + 1) : gy

        days = (365 * gy) +
            parseInt((gy2 + 3) / 4) -
            parseInt((gy2 + 99) / 100) +
            parseInt((gy2 + 399) / 400) -
            80 +
            gd +
            gdm[gm - 1]

        jy += 33 * parseInt(days / 12053)
        days %= 12053
        jy += 4 * parseInt(days / 1461)
        days %= 1461

        if (days > 365) 
        {
            jy += parseInt((days - 1) / 365)
            days = (days - 1) % 365
        }

        const jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30)
        const jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30))

        return {
            year : jy ,
            month : jm ,
            day : jd
        }
    }

    static getWeekDay (year, month, day) 
    {
        const getDays = (month, day) => 
        {
            if (month < 8) {
                return (month - 1) * 31 + day
            }

            return 6 * 31 + (month - 7) * 30 + day
        }

        const getDiffDays = (year1, month1, day1, year2, month2, day2) => 
        {
            let diffDays = getDays(month2, day2) - getDays(month1, day1)

            const y1 = (year1 < year2) ? year1 : year2
            const y2 = (year1 < year2) ? year2 : year1

            for (let y = y1; y < y2; y++) 
            {
                if (JllCalendarDateHelper.isLeapYear(y)) {
                    diffDays += (year1 < year2) ? 366 : -366

                }
                else {
                    diffDays += (year1 < year2) ? 365 : -365
                }
            }

            return diffDays
        }

        return JllCalendarDateHelper._mod(getDiffDays(1392, 3, 25, year, month, day), 7)
    }

    static getDaysInMonth (year, month) 
    {
        return [
            0,
            31, 31, 31,
            31, 31, 31,
            30, 30, 30,
            30, 30, (JllCalendarDateHelper.isLeapYear(year) ? 30 : 29)
        ][month]
    }

}