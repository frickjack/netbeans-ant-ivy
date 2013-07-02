netbeans-ant-ivy
================

ANT rules adding IVY support and some other features to netbeans project ANT project.

* Start with a netbeans java, scala, or web project
* add an ivy.xml in the project's root directory next to the build.xml file if you want to use ivy
* add `<import file="../netbeans-ant-ivy/ivy_build_rules.xml"/>` to build.xml
* optionally add a reference to a junit 3.8 test suite if you want to enable the 'test-jenkins' rule

After all that, then hopefully the project includes 'resolve' and 'publish' rules that link into the
normal netbeans build rules, auto-downloads ivy.jar, and sets up the ivy repo under netbeans-ant-ivy/ivyRepo.
