$.widget("DragonCoding.GridView", {
    options: {
        jsonUrl: "",
        dataClass: "",
        replacementHeaders: [],
        cssClass: "",
        caption: "",
        headerWordDelimiter: "caps",
        dark: false,
        light: false,
        striped: true,
        hover: true,
        bordered: false,
        responsiveAlways: true,
        responsiveSm: false,
        responsiveMd: false,
        responsiveLg: false,
        responsiveXl: false
    },
    _create: function() {
        var $self = this;
        $self.container = this.element;
        $self.container.addClass("DC-GridView");

        $self.cols = [];
        $self.headers = []
        $self.mainTable = $("<table>", {}).appendTo($self.container);
        $self._setCaption();
        
        $self.head = $("<thead>", {}).appendTo($self.mainTable);

        $self.body = $("<tbody>", {}).appendTo($self.mainTable);

        $self.footer = $("<tfoot>", {}).appendTo($self.mainTable);
        $self._setTableStyles();
        $self._analyzeData();
        $self._refresh();
    },
    _refresh: function () {
        var $self = this;
        $.getJSON($self.options.jsonUrl, function (data) {
            if ($self.options.dataClass === "")
                $self._drawBody(data);
            else {
                var collection = [];
                $.each(data, function (idx, obj) {
                    var item = new $self.options.dataClass(obj);
                    collection.push(item);
                });
                $self._drawBody(collection);
            }
        });
    },
    changeTable: function (url, replacementHeaders, dataClass) {
        var $self = this;
        $self.options.jsonUrl = url;
        if (replacementHeaders != $self.options.replacementHeaders)
            $self.options.replacementHeaders = replacementHeaders;
        if ($self.options.dataClass != dataClass)
            $self.options.dataClass = dataClass;
        $self._analyzeData();
    },
    _destroy: function () {
        var $self = this;
        $self.container.removeClass("DC-GridView");
    },
    _setOptions: function () {
        var $self = this;
        $self._superApply(arguments);
        $self._refresh();
    },
    _setOption: function (key, value) {
        var $self = this;
        $self._super(key, value);
    },
    _setTableStyles: function () {
        var $self = this;
        var setCustomClass = ($self.options.cssClass === "" ? false : true);
        if (setCustomClass === false) {
            $($self.mainTable).addClass("table");
            if ($self.options.dark === true)
                $($self.mainTable).addClass("table-dark");
            if ($self.options.light === true)
                $($self.mainTable).addClass("table-light");
            if ($self.options.striped === true)
                $($self.mainTable).addClass("table-striped");
            if ($self.options.hover === true)
                $($self.mainTable).addClass("table-hover");
            if ($self.options.bordered === true) {
                $($self.mainTable).addClass("table-bordered");
            } else {
                $($self.mainTable).addClass("table-borderless");
            }
            if ($self.options.responsiveAlways === true)
                $($self.mainTable).addClass("table-responsive")
            if ($self.options.responsiveSm === true) 
                $($self.mainTable).addClass("table-responsive-sm");
            if ($self.options.responsiveMd === true)
                $($self.mainTable).addClass("table-responsive-md");
            if ($self.options.responsiveLg === true)
                $($self.mainTable).addClass("table-responsive-lg");
            if ($self.options.responsiveXl === true)
                $($self.mainTable).addClass("table-responsive-xl");
        } else {
            $($self.mainTable).addClass($self.options.customTableClass);
        }
    },
    _setCaption: function () {
        var $self = this;
        var isCaptioned = ($self.options.caption === "" ? false : true);
        if (isCaptioned === true) {
            var caption = $("<caption>")
                .text($self.options.caption)
                .appendTo($self.mainTable);
        }
    },
    _drawHeader: function () {
        var $self = this;
        $($self.head).html('');
        if ($self.options.replacementHeaders.length > 0) {
            $self.headers = $self.options.replacementHeaders;
        } else {
            $self.headers = $self.cols;
        }
        var tr = $("<tr>", {

        })
            .appendTo($self.head);

        var tokenizedHeaders = $self._parseHeaders($self.headers);

        $.each(tokenizedHeaders, function (index, hdr) {
            var hd = $("<th>", {
                "scope": "col"
            })
                .text(hdr)
                .appendTo(tr);
        });
        
    },
    _drawFooter: function () {
        var $self = this;
        $($self.footer).html('');
        var tr = $("<tr>", {})
            .appendTo($self.footer);
    },
    _drawBody: function (data) {
        var $self = this;
        $($self.body).html("");
        $.each(data, function (idx, obj) {
            var tr = $("<tr>", {

            })
                .appendTo($self.body);

            $.each($self.cols, function (id, key) {
                var td = $("<td>", {}).text(obj[key]).appendTo(tr);
            });
        });
    },
    _analyzeData: function () {
        var $self = this;
        if ($self.options.dataClass != "") {
            var obj = new $self.options.dataClass;
            $self.cols = Object.keys(obj);
            $self._drawHeader();
            $self._drawFooter();
            $self._refresh();
        } else {
            $.getJSON($self.options.jsonUrl, function (data) {
                $self.cols = Object.keys(data[0]);
                $self._drawHeader();
                $self._drawFooter();
                $self._refresh();
            }).fail(function (xhr, status, error) {
                var err = status + "," + error;
                alert(xhr);
            });
        }
    },
    _parseHeaders: function (headers) {
        var $self = this;
        var output = [];
        if ($self.options.headerWordDelimiter != "") {
            switch ($self.options.headerWordDelimiter) {
                case "caps":
                    $.each(headers, function (idx, hdg) {
                        output.push(hdg.match(/([A-Z][^A-Z]*)/g).join(' '));
                    });
                    break;
                default:
                    $.each(headers, function (idx, hdg) {
                        output.push(hdg.split($self.options.headerWordDelimiter).join(' '));
                    });
                    break;
            }
        } else {
            output = headers;
        }
        return output;
    }

})