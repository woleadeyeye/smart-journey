<aura:application extends="force:slds" implements="force:appHostable,flexipage:availableForAllPageTypes,flexipage:availableForRecordHome,force:hasRecordId,forceCommunity:availableForAllPageTypes,force:hasSObjectName" access="global">
	
	<aura:attribute name="pageNumber" type="Integer" default="1"/>
	<aura:attribute name="recordId" type="String" />
	<aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
	<aura:html tag="style">
		body{
			width: 768px;
			height: 1024px;
			margin-left: auto;
			margin-right: auto;
			background: linear-gradient(315.17deg, #051A4E 0%, #0D2C76 100%);
		}
	</aura:html>
	<aura:if isTrue="{!v.pageNumber == 1}">
		<c:smartJourney onpagechange="{!c.handlePageChangeEvent}" recordId="{!v.recordId}"/>
	</aura:if>
	<aura:if isTrue="{!v.pageNumber == 2}">
		<c:currentEnergyPage  onpagechange="{!c.handlePageChangeEvent}"/>
	</aura:if>
</aura:application>