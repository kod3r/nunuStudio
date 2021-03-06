"use strict";

function ConsoleTab(parent, closeable, container, index)
{
	TabElement.call(this, parent, closeable, container, index, "Console", Editor.filePath + "icons/misc/console.png");

	this.history = [];

	this.console = document.createElement("div");
	this.console.style.overflow = "auto";
	this.console.style.top = "0px";
	this.console.style.left = "0px";
	this.console.style.width = "100%";
	this.element.appendChild(this.console);

	this.code = document.createElement("input");
	this.code.type = "text";
	this.code.style.position = "absolute";
	this.code.style.margin = "0";
	this.code.style.boxSizing = "border-box";
	this.code.style.textIndent = "4px";
	this.code.style.color = "#FFFFFF";
	this.code.style.borderStyle = "solid";
	this.code.style.borderRightStyle = "none";
	this.code.style.borderLeftStyle = "none";
	this.code.style.borderBottomStyle = "none";
	this.code.style.borderWidth = "2px";
	this.code.style.borderColor = Editor.theme.barColor;
	this.code.style.backgroundColor = Editor.theme.panelColor;
	this.code.style.bottom = "0px";
	this.code.style.left = "0px";
	this.code.style.width = "100%";
	this.code.style.height = "25px";
	this.element.appendChild(this.code);

	var self = this;

	this.code.onkeydown = function(event)
	{
		if(event.keyCode === Keyboard.ENTER)
		{
			try
			{
				console.log(eval.call(window, this.value));
			}
			catch(e)
			{
				console.error(e);
			}

			self.history.push(this.value);
			this.value = "";
		}
		else if(event.keyCode === Keyboard.UP)
		{
			if(self.history.length > 0)
			{
				this.value = self.history.pop();
			}
		}
	};
}

ConsoleTab.prototype = Object.create(TabElement.prototype);

//Create a new log division element and fill with information from the object
ConsoleTab.createNessage = function(object)
{
	var log = document.createElement("div");
	log.style.width = "100%";
	log.style.color = "#FFFFFF";

	if(object instanceof Image)
	{
		var preview = document.createElement("img");
		preview.src = object.data;
		preview.height = 60;
		log.appendChild(preview);

		var table = document.createElement("table");
		table.style.display = "inline-block";

		var type = table.insertRow(0);
		type.insertCell(0).innerHTML = "Image";

		var name = table.insertRow(1);
		name.insertCell(0).innerHTML = "Name";
		name.insertCell(1).innerHTML = object.name;

		var uuid = table.insertRow(2);
		uuid.insertCell(0).innerHTML = "UUID";
		uuid.insertCell(1).innerHTML = object.uuid;

		var format = table.insertRow(3);
		format.insertCell(0).innerHTML = "Format";
		format.insertCell(1).innerHTML = object.format;

		var encoding = table.insertRow(4);
		encoding.insertCell(0).innerHTML = "Encoding";
		encoding.insertCell(1).innerHTML = object.encoding;

		log.appendChild(table);
	}
	else if(object instanceof THREE.Texture)
	{
		var preview = TexturePreview.generate(object);
		preview.height = 60;
		log.appendChild(preview);

		var table = document.createElement("table");
		table.style.display = "inline-block";

		var type = table.insertRow(0);
		type.insertCell(0).innerHTML = "Type";
		type.insertCell(1).innerHTML = object.type;

		var name = table.insertRow(1);
		name.insertCell(0).innerHTML = "Name";
		name.insertCell(1).innerHTML = object.name;

		var uuid = table.insertRow(2);
		uuid.insertCell(0).innerHTML = "UUID";
		uuid.insertCell(1).innerHTML = object.uuid;

		log.appendChild(table);
	}
	else if(object instanceof THREE.Material)
	{
		var preview = MaterialPreview.generate(object);
		preview.height = 60;
		log.appendChild(preview);

		var table = document.createElement("table");
		table.style.display = "inline-block";

		var type = table.insertRow(0);
		type.insertCell(0).innerHTML = "Type";
		type.insertCell(1).innerHTML = object.type;

		var name = table.insertRow(1);
		name.insertCell(0).innerHTML = "Name";
		name.insertCell(1).innerHTML = object.name;

		var uuid = table.insertRow(2);
		uuid.insertCell(0).innerHTML = "UUID";
		uuid.insertCell(1).innerHTML = object.uuid;

		log.appendChild(table);
	}
	else if(object instanceof THREE.Vector2)
	{
		var table = document.createElement("table");
		table.style.display = "inline-block";

		var coord = table.insertRow(0);
		coord.insertCell(0).innerHTML = "X";
		coord.insertCell(1).innerHTML = "Y";

		var value = table.insertRow(1);
		value.insertCell(0).innerHTML = object.x;
		value.insertCell(1).innerHTML = object.y;

		log.appendChild(table);
	}
	else if(object instanceof THREE.Vector3)
	{
		var table = document.createElement("table");
		table.style.display = "inline-block";

		var coord = table.insertRow(0);
		coord.insertCell(0).innerHTML = "X";
		coord.insertCell(1).innerHTML = "Y";
		coord.insertCell(2).innerHTML = "Z";

		var value = table.insertRow(1);
		value.insertCell(0).innerHTML = object.x;
		value.insertCell(1).innerHTML = object.y;
		value.insertCell(2).innerHTML = object.z;

		log.appendChild(table);
	}
	else if(object instanceof THREE.Vector4)
	{
		var table = document.createElement("table");
		table.style.display = "inline-block";

		var coord = table.insertRow(0);
		coord.insertCell(0).innerHTML = "X";
		coord.insertCell(1).innerHTML = "Y";
		coord.insertCell(2).innerHTML = "Z";
		coord.insertCell(2).innerHTML = "W";

		var value = table.insertRow(1);
		value.insertCell(0).innerHTML = object.x;
		value.insertCell(1).innerHTML = object.y;
		value.insertCell(2).innerHTML = object.z;
		value.insertCell(2).innerHTML = object.w;

		log.appendChild(table);
	}
	else if(object === null)
	{
		log.innerHTML = "null";
	}
	/*else if(object instanceof Function || object instanceof Error)
	{
		log.innerHTML = object;
	}
	else if(object instanceof Object)
	{
		_console.log(object);
		jsonTree.create(object, log);
	}*/
	else
	{
		log.innerHTML = object;
	}

	return log;
};

ConsoleTab.createBar = function()
{
	var bar = document.createElement("div");
	bar.style.width = "100%";
	bar.style.height = "1px";
	bar.style.marginTop = "4px";
	bar.style.marginBottom = "4px";
	bar.style.backgroundColor = Editor.theme.barColor;
	return bar;
};

//Normal log messsage
ConsoleTab.prototype.log = function(args)
{
	for(var i = 0; i < args.length; i++)
	{
		this.console.appendChild(ConsoleTab.createNessage(args[i]));
	}

	this.console.appendChild(ConsoleTab.createBar());
	this.console.scrollTop = Number.MAX_SAFE_INTEGER;
};

//Warning message
ConsoleTab.prototype.warn = function(args)
{
	for(var i = 0; i < args.length; i++)
	{
		var log = ConsoleTab.createNessage(args[i]);
		log.style.color = "#FFFF00";
		this.console.appendChild(log);
	}

	this.console.appendChild(ConsoleTab.createBar());
	this.console.scrollTop = Number.MAX_SAFE_INTEGER;
};

//Error message
ConsoleTab.prototype.error = function(args)
{
	for(var i = 0; i < args.length; i++)
	{
		var log = ConsoleTab.createNessage(args[i]);
		log.style.color = "#FF0000";
		this.console.appendChild(log);
	}

	this.console.appendChild(ConsoleTab.createBar());
	this.console.scrollTop = Number.MAX_SAFE_INTEGER;
};

//Update interface
ConsoleTab.prototype.updateInterface = function()
{
	if(this.visible)
	{
		this.element.style.display = "block";

		this.element.style.top = this.position.y + "px";
		this.element.style.left = this.position.x + "px";
		this.element.style.width = this.size.x + "px";
		this.element.style.height = this.size.y + "px";

		this.console.style.height = (this.size.y - 25) + "px";
	}
	else
	{
		this.element.style.display = "none";
	}
};

