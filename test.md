---
title: Vaadin上路
date: '2013-05-04'
description:
categories: 开源学习
tags: 
- Vaadin
---

# Vaadin简介 #
Vaadin 是一款使用 Apache V2 许可协议的开源产品,现在已经发展成Vaadin 7。Joonas Lehtinen（Vaadin.com的CEO），关于GWT编程模型有两个级别的抽象：

1. UI由Java编写，并编译成JavaScript。
1. 原生JavaScript。SmartGWT、GXT和Errai本质上只是在由GWT定义的编程模型下提供了更多（非常好用的）组件和帮助。

Vaadin基于GWT的编程模型添加了服务端的Java编程模型。这是更高一级的抽象，通过降低实现代web应用的软件层级数来加快开发。用GWT，需要构建UI层（浏览器内部）、RPC，还有UI服务（服务器内部）和业务逻辑（服务器内部）。用Vaadin，只需要服务端UI和业务逻辑层。这本质上削减了开发应用UI所需要的近一半代码量。如果需要更多的灵活性，Vaadin还同时支持Java和JavaScript来编写客户端UI。<br> 

Vaadin7五大特性：<br/>

1. 完全GWT的嵌入。这样我们可以更容易的支持整个包，并在你的应用中利用Google强大的Java-to-JavaScript编译器。
1. Widget扩展允许在已有的widget上像独立的扩展那样添加功能。更多信息请访问：https://vaadin.com/wiki/-/wiki/Main/Creating%20a%20component%20extension。
1. Sass编译器引入了期盼很久的主题模块化。
1. 重新设计的布局引擎使用浏览器原生布局计算来替代JavaScript计算。这彻底的降低了回流量，使得布局速度更快。额外收获是，我们现在支持全部的CSS。
1. 重新设计的windows API使Vaadin应用更像web应用，简化了http请求和网页访问。


官方网站：
https://vaadin.com/home<br>
http://vaadin.com/download/release/7.0/7.0.5/release-notes.html/<br>
https://vaadin.com/tutorial<br>
一个地址簿应用，可以从git进行下载
https://github.com/vaadin/addressbook
# 从源码学习 #
打开https://github.com/vaadin/vaadin，可以看到英文文档，大体的步骤如下：

1. 下载源代码
<pre><code>git clone https://github.com/vaadin/vaadin.git
git clone https://github.com/vaadin/gwt.git
git clone https://github.com/vaadin/gwt-tools.git</code></pre>
1. 在eclipse配置好连接资源**GWT_ROOT**（在eclipse的General -> Workspace -> Linked Resources）
1. 在eclipse配置好Variables**GWT_TOOLS**（Java -> Build Path -> Classpath Variables）
1. 在eclipse引入存在的项目vaadin，gwt-dev，gwt-user（在上面下载的vaadin.git的文件夹中)
1. 在vaadin的项目右键点击，执行Ivy -> Resolve,让vaadin引入依赖的jar,最后不进行报错。
1. 进行测试，找到`com.vaadin.launcher.DevelopmentServerLauncher`，运行此java代码（or Debug As -> Java Application)，浏览器访问
 `http://localhost:8888/run/com.vaadin.tests.components.label.LabelModes?restartApplication`
会出现测试界面， run和?之间的代码可以换成其他的类进行测试。例如访问
 `http://localhost:8888/run/com.vaadin.tests.components.calendar.CalendarTest?restartApplication `，可以看到一个关于时间的测试。


# Vaadin Eclipse开发环境的配置 #
1. **安装插件**，启动 Eclipse，选择 Help 菜单下的“Install New Software”命令，在弹出的 Install 对话框中点击 Add 按钮，在 Add Site 弹出对话框的 Location 输入框中填入更新站点地址：http://Vaadin.com/eclipse，Name 输入框中填入 Vaadin 作为站点名称后点击 OK 按钮 
1. **新建项目**，使用 Eclipse 创建 Vaadin 项目时只需在 File 菜单下选择 New -> project ->Vaadin ->Vaadin Project 即可建立一个 Vaadin 工程<br/>
![image](/assets/media/post/first.png)<br/><br/>
1. 项目的配置过程<br/>
![image](/assets/media/post/vaadin7new.png)<br/>
1. 项目建立完成后，要先解决jar依赖问题(执行Ivy -> Resolve)。<br/><br/>
![image](/assets/media/post/resolve.png)<br/>
1. 运行项目，则会自动在浏览器打开项目测试页面(Run 菜单中选择 Run As- 〉 Run On Server)<br/><br/>
![image](/assets/media/post/yunxing.png)<br/>

# asdasdfsad




# 参考文章 #
Vaadin 7发布

> http://www.infoq.com/cn/news/2013/03/vaadin-7


>sdfsdfsdf



Vaadin -来自北欧的 Web应用开发利器
> http://www.ibm.com/developerworks/cn/web/1101_wangyc_vaadin1/index.html<br>

Vaadin 7发布，内嵌GWT组件
> http://www.infoq.com/cn/news/2013/03/vaadin-7

