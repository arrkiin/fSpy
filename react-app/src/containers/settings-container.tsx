import * as React from 'react';
import { SidePanelStyle } from './../styles/styles';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppAction, setCalibrationMode, setImageOpacity, setPrincipalPointMode1VP, setPrincipalPointMode2VP, setHorizonMode } from '../actions';
import { CalibrationMode, GlobalSettings } from '../types/global-settings';
import { StoreState } from '../types/store-state';
import { CalibrationSettings1VP, CalibrationSettings2VP, PrincipalPointMode1VP, PrincipalPointMode2VP, HorizonMode } from '../types/calibration-settings';

interface SettingsContainerProps {
  globalSettings: GlobalSettings
  calibrationSettings1VP: CalibrationSettings1VP
  calibrationSettings2VP: CalibrationSettings2VP
  onCalibrationModeChange(calibrationMode: CalibrationMode): void
  onImageOpacityChange(opacity: number): void
  onHorizonModeChange(horizonMode: HorizonMode): void
  onPrincipalPointModeChange1VP(principalPointMode: PrincipalPointMode1VP): void
  onPrincipalPointModeChange2VP(principalPointMode: PrincipalPointMode2VP): void

}

class SettingsContainer extends React.PureComponent<SettingsContainerProps> {
  render() {
    return (
      <div style={SidePanelStyle}>
        <div>
          <button onClick={() => {
            this.props.onCalibrationModeChange(CalibrationMode.OneVanishingPoint)
          }}>
            1 VP
        </button>
          <button onClick={() => {
            this.props.onCalibrationModeChange(CalibrationMode.TwoVanishingPoints)
          }}>
            2 VP
        </button>
        </div>

        {this.renderCalibrationSettings()}

        <div>
          Dimmed: <input
            name="imageIsDimmed"
            type="checkbox"
            checked={this.props.globalSettings.imageOpacity < 1}
            onChange={(event: any) => {
              this.props.onImageOpacityChange(event.target.checked ? 0.2 : 1)
            }}
          />
        </div>
      </div>
    )
  }

  private renderCalibrationSettings() {
    let is1VPMode = this.props.globalSettings.calibrationMode == CalibrationMode.OneVanishingPoint
    if (is1VPMode) {
      return (
        <div>
          <select
            value={this.props.calibrationSettings1VP.principalPointMode}
            onChange={(event: any) => {
              this.props.onPrincipalPointModeChange1VP(event.target.value)
            }}
          >
            <option value={PrincipalPointMode1VP.Default}>Default</option>
            <option value={PrincipalPointMode1VP.Manual}>Manual</option>
          </select>

          <select
            value={this.props.calibrationSettings1VP.horizonMode}
            onChange={(event: any) => {
              this.props.onHorizonModeChange(event.target.value)
            }}
          >
            <option value={HorizonMode.Default}>Default</option>
            <option value={HorizonMode.Manual}>Manual</option>
          </select>
        </div>
      )
    }
    else {
      return (
        <select
          value={this.props.calibrationSettings2VP.principalPointMode}
          onChange={(event: any) => {
            this.props.onPrincipalPointModeChange2VP(event.target.value)
          }}
        >
          <option value={PrincipalPointMode2VP.Default}>Default</option>
          <option value={PrincipalPointMode2VP.Manual}>Manual</option>
          <option value={PrincipalPointMode2VP.FromThirdVanishingPoint}>From 3rd vanishing point</option>
        </select>
      )
    }
  }
}

export function mapStateToProps(state: StoreState) {
  return {
    globalSettings: state.globalSettings,
    calibrationSettings1VP: state.calibrationSettings1VP,
    calibrationSettings2VP: state.calibrationSettings2VP
  }
}

export function mapDispatchToProps(dispatch: Dispatch<AppAction>) {
  return {
    onCalibrationModeChange: (calibrationMode: CalibrationMode) => {
      dispatch(setCalibrationMode(calibrationMode))
    },
    onImageOpacityChange: (opacity: number) => {
      dispatch(setImageOpacity(opacity))
    },
    onHorizonModeChange: (horizonMode: HorizonMode) => {
      dispatch(setHorizonMode(horizonMode))
    },
    onPrincipalPointModeChange1VP: (principalPointMode: PrincipalPointMode1VP) => {
      dispatch(setPrincipalPointMode1VP(principalPointMode))
    },
    onPrincipalPointModeChange2VP: (principalPointMode: PrincipalPointMode2VP) => {
      dispatch(setPrincipalPointMode2VP(principalPointMode))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);