<aura:application extends="force:slds" implements="force:appHostable,flexipage:availableForAllPageTypes,flexipage:availableForRecordHome,force:hasRecordId,forceCommunity:availableForAllPageTypes,force:hasSObjectName" access="global">
	
	<aura:attribute name="pageNumber" type="Integer" default="1" access="global"/>
	<aura:attribute name="accountDetails" type="Object" default="{}" access="global"/>
	<aura:attribute name="recordId" type="String" />
	<aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
	<aura:html tag="style">
		body{
			margin: 0;
			width: 100vw;
			height: 100vh;
		}
	</aura:html>
	<c:parentComponent></c:parentComponent>
</aura:application>