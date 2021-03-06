import { Platform, Arch, Target } from "electron-builder-core"
import { PlatformPackager } from "./platformPackager"
import { Metadata, Config, AfterPackContext } from "./metadata"
import { PublishConfiguration } from "electron-builder-http/out/publishOptions"
import { TmpDir } from "electron-builder-util/out/tmp"
import { AppInfo } from "./appInfo"

export interface PackagerOptions {
  targets?: Map<Platform, Map<Arch, string[]>>

  projectDir?: string | null

  cscLink?: string | null
  cscKeyPassword?: string | null

  cscInstallerLink?: string | null
  cscInstallerKeyPassword?: string | null

  platformPackagerFactory?: ((info: BuildInfo, platform: Platform, cleanupTasks: Array<() => Promise<any>>) => PlatformPackager<any>) | null

  /**
   * @deprecated Use {@link PackagerOptions#config} instead.
   */
  readonly devMetadata?: Metadata

  readonly config?: Config

  /**
   * The same as [application package.json](https://github.com/electron-userland/electron-builder/wiki/Options#AppMetadata).
   *
   * Application `package.json` will be still read, but options specified in this object will override.
   */
  readonly appMetadata?: Metadata

  readonly effectiveOptionComputed?: (options: any) => Promise<boolean>

  readonly extraMetadata?: any

  readonly prepackaged?: string
}

export interface BuildInfo {
  options: PackagerOptions

  metadata: Metadata

  config: Config

  projectDir: string
  appDir: string

  electronVersion: string

  isTwoPackageJsonProjectLayoutUsed: boolean

  appInfo: AppInfo

  readonly tempDirManager: TmpDir

  repositoryInfo: Promise<SourceRepositoryInfo | null>

  dispatchArtifactCreated(event: ArtifactCreated): void

  afterPack(context: AfterPackContext): Promise<void>
}

export interface ArtifactCreated {
  readonly packager: PlatformPackager<any>
  readonly target: Target | null

  readonly file?: string
  readonly data?: Buffer

  readonly artifactName?: string

  readonly publishConfig?: PublishConfiguration
}

export interface SourceRepositoryInfo {
  type: string
  domain: string
  user: string
  project: string
}